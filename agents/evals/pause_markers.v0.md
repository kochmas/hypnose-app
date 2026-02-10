# Eval: Pause Marker Cases (v0)

Ziel: Marker `[[pause:…]]` sind “tag-free” und renderbar zu SSML unter der Haube.

## Cases
1) Inline Pause
Input:
`Atme tief ein. [[pause:2s]] Und langsam wieder aus.`
Erwartung:
- Parser erkennt 1 Pause (2000 ms) zwischen zwei Textblöcken.

2) Zeilen-Pause
Input:
```
Atme tief ein.
[[pause:2s]]
Und langsam wieder aus.
```
Erwartung:
- Parser erkennt Pause-Block (2000 ms) zwischen Absätzen.

3) Range-Clamp
Input:
`Jetzt entspannen. [[pause:30s]] Weiter.`
Erwartung:
- Pause wird auf Max (z.B. 10s) geklemmt (konfigurierbar).

4) Unknown Marker (fail-soft)
Input:
`Hallo [[pause:two]] Welt`
Erwartung:
- Kein Crash; Marker bleibt Text oder wird ignoriert (klar definieren).

