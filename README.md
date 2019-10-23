# Usage

This utility can generate a number of randomized racing events.

In addition it allows to tweak probability distribution of tracks and gamemodes.

```
$ node .
Event loop file has been saved into 'out'.
```

Generates a number of randomized events:

```
#====================================
# Automatically generated event loops
# Number of events: 100
#====================================

el_add=speedway1_figure_8
el_gamemode=racing
el_laps=10
el_car_reset_disabled=0
el_wrong_way_limiter_disabled=0
el_car_class_restriction=c
el_car_restriction=
el_weather=overcast day

el_add=bigstadium_demolition_arena
el_gamemode=team derby
el_laps=7
el_car_reset_disabled=0
el_wrong_way_limiter_disabled=0
el_car_class_restriction=c
el_car_restriction=
el_weather=hazy sunrise

...
```
