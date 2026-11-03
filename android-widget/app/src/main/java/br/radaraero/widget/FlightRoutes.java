package br.radaraero.widget;
import org.json.*;import java.net.*;import java.util.*;
/** On-demand callsign lookup. No route database is bundled or persisted. */
final class FlightRoutes {
 private static final LinkedHashMap<String,Entry> cache=new LinkedHashMap<>();
 private static final class Entry {final String label;final long until;Entry(String label,long until){this.label=label;this.until=until;}}
 static String lookup(String value){String call=value.trim().toUpperCase(Locale.ROOT);if(!call.matches("[A-Z]{3}[0-9][A-Z0-9]{0,7}"))return "Rota não informada";long now=System.currentTimeMillis();synchronized(cache){Entry hit=cache.get(call);if(hit!=null&&hit.until>now)return hit.label;}
  String label="Rota indisponível";long ttl=30000;HttpURLConnection connection=null;
  try{connection=(HttpURLConnection)new URL("https://api.adsbdb.com/v0/callsign/"+call).openConnection();connection.setConnectTimeout(3000);connection.setReadTimeout(3000);int status=connection.getResponseCode();if(status==404){label="Rota não cadastrada";ttl=120000;}else if(status==200){JSONObject route;try(java.io.InputStream stream=connection.getInputStream()){route=new JSONObject(new String(ConfigureActivity.readLimited(stream,65536),java.nio.charset.StandardCharsets.UTF_8)).getJSONObject("response").getJSONObject("flightroute");}boolean matches=call.equalsIgnoreCase(route.optString("callsign"))||call.equalsIgnoreCase(route.optString("callsign_icao"))||call.equalsIgnoreCase(route.optString("callsign_iata"));String origin=code(route.optJSONObject("origin")),destination=code(route.optJSONObject("destination")),midpoint=code(route.optJSONObject("midpoint"));if(matches&&origin!=null&&destination!=null){label=origin+" → "+(midpoint==null?"":midpoint+" → ")+destination+" · rota cadastrada";ttl=600000;}else{label="Rota não cadastrada";ttl=120000;}}}catch(Exception ignored){}finally{if(connection!=null)connection.disconnect();}
  synchronized(cache){if(cache.size()>=64)cache.remove(cache.keySet().iterator().next());cache.put(call,new Entry(label,System.currentTimeMillis()+ttl));}return label;
 }
 private static String code(JSONObject value){if(value==null)return null;String code=value.optString("iata_code").toUpperCase(Locale.ROOT);if(code.matches("[A-Z]{3}"))return code;code=value.optString("icao_code").toUpperCase(Locale.ROOT);return code.matches("[A-Z]{4}")?code:null;}
}
