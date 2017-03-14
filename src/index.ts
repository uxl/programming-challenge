/// <reference path="../typings/index.d.ts" />

//load Interface
import { UI } from "./UI";

let ui = new UI();

/*
index.ts
    \____________.
               Business.ts // (just app logic)
                  \__imports.
                      ScoreBoard.ts
               UI.ts // (just animation)!
                  \__imports.
                            PIXI - rendering engine
                            gsap - animation library
                            Loader - Image assets - creates sprites
                            SoundEffects - loads sound files and playback
                            ColorPalettes - loads color palettes form json
                            Btn - button class handles rollovers (needs loader, and business and sound)
                            Player - extend displayobject - draws and moves player (needs loader and sound)
                            Gizmo - extend displayobject - draws and animatesgizmo (needs laoder and sound)
                            Grid - extend displayobject - draws squares handles turning them on and off random animate in(needs color and business logic)
                            TypeMe - animates text
                            RenderLoop - framerate of canvas redraw

                    displaygrid
                    move player
                    kill player
                    create player

                    start playback
                    pause playback
                    reset playback


                  */
