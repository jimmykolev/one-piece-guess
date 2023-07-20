

const characters = [
    {
        "name": "Monkey D. Luffy",
        "age": 19,
        "origin": "East Blue",
        "bounty": 3000000000,
        "height": 174
    },
    {
        "name": "Roronoa Zoro",
        "age": 21,
        "origin": "East Blue",
        "bounty": 1111000000,
        "height": 181
    },
    {
        "name": "Nami",
        "age": 20,
        "origin": "East Blue",
        "bounty": 360000000,
        "height": 170
    },
    {
        "name": "Usopp",
        "age": 19,
        "origin": "East Blue",
        "bounty": 500000000,
        "height": 176
    },
    {
        "name": "Vinsmoke Sanji",
        "age": 21,
        "origin": "North Blue",
        "bounty": 1032000000,
        "height": 180
    },
    {
        "name": "Tony Tony Chopper",
        "age": 17,
        "origin": "Grand Line",
        "bounty": 1000,
        "height": 90
    },
    {
        "name": "Nico Robin",
        "age": 30,
        "origin": "West Blue",
        "bounty": 930000000,
        "height": 188
    },
    {
        "name": "Franky",
        "age": 36,
        "origin": "South Blue",
        "bounty": 394000000,
        "height": 240
    },
    {
        "name": "Brook",
        "age": 90,
        "origin": "West Blue",
        "bounty": 383000000,
        "height": 277  
    },
    {
        "name": "Jinbe",
        "age": 46,
        "origin": "Grand Line",
        "bounty": 1100000000,
        "height": 301
    },
    {
        "name": "Sabo",
        "age": 22,
        "origin": "East Blue",
        "bounty": 602000000,
        "height": 187
    },
    {
        "name": "Boa Hancock",
        "age": 31,
        "origin": "Grand Line",
        "bounty": 1659000000,
        "height": 191
    },
    {
        "name": "Buggy",
        "age": 39,
        "origin": "Grand Line",
        "bounty": 3189000000,
        "height": 192
    },
    {
        "name": "Dracule Mihawk",
        "age": 43,
        "origin": "Grand Line",
        "bounty": 3590000000,
        "height": 198
    },
    {
        "name": "Shanks",
        "age": 39,
        "origin": "West Blue",
        "bounty": 4048900000,
        "height": 199
    },
    {
        "name": "Kaido",
        "age": 59,
        "origin": "Grand Line",
        "bounty": 4611100000,
        "height": 710
    },
    {
        "name": "Charlotte Linlin",
        "age": 68,
        "origin": "Grand Line",
        "bounty": 4388000000,
        "height": 880
    },
    {
        "name": "Trafalgar D. Water Law",
        "age": 26,
        "origin": "North Blue",
        "bounty": 3000000000,
        "height": 191
    },
    {
        "name": "Eustass Kid",
        "age": 23,
        "origin": "South Blue",
        "bounty": 3000000000,
        "height": 205
    },
    {
        "name": "Capone Bege",
        "age": 42,
        "origin": "West Blue",
        "bounty": 350000000,
        "height": 216
    },
    {
        "name": "Scratchmen Apoo",
        "age": 28,
        "origin": "Grand Line",
        "bounty": 350000000,
        "height": 198
    },
    {
        "name": "Basil Hawkins",
        "age": 31,
        "origin": "North Blue",
        "bounty": 320000000,
        "height": 210
    },
    {
        "name": "X Drake",
        "age": 33,
        "origin": "North Blue",
        "bounty": 222000000,
        "height": 233
    },
    {
        "name": "Urouge",
        "age": 47,
        "origin": "Sky Island",
        "bounty": 108000000,
        "height": 388
    },
    {
        "name": "Jewelry Bonney",
        "age": 24,
        "origin": "South Blue",
        "bounty": 320000000,
        "height": 174
    },
    {
        "name": "Killer",
        "age": 27,
        "origin": "South Blue",
        "bounty": 200000000,
        "height": 195
    },
    {
        "name": "Marshall D. Teach",
        "age": 40,
        "origin": "Grand Line",
        "bounty": 3996000000,
        "height": 344
    },
    {
        "name": "King",
        "age": 47,
        "origin": "Grand Line",
        "bounty": 1390000000,
        "height": 613
    },
    {
        "name": "Queen",
        "age": 56,
        "origin": "Grand Line",
        "bounty": 1320000000,
        "height": 612
    }
  ];

import { NextResponse } from "next/server";

export async function GET() {


    
    return NextResponse.json(characters);
}