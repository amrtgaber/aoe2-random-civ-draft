# AoE2 Civ Randomizer Design

## Sections

[Description](#description)

[Versions and features](#versions-and-features)

[Paramters for random selection](#parameters-for-random-selection)

[Technologies](#technologies)

# Description

This app will pick a civilization in Age of Empires 2 at random from a list of civilizations in the game. Currently the game itself implements this functionality but it is very limited and it picks from all possible civilizations. The goal of this app is to let u pick from a subset of the total list. As the app improves you'll have more control over the parameters of this subset but at first it will simply duplicate the functionality from the original game.

This project is mostly for practicing and learning web development with new technologies. The goal will be to keep each version simple and easy to implement. Ultimately, there should be an easy-to-use workflow for adding new civs or new civ parameters for random selection. If the random civ selection feels complete this project may be used as a template for doing random map selection as well.

# Versions and features

## VERSION 1

### App Foundation

- Features
  - randomly select a civ from full list of civs
- Components
  - top app bar (do we need this?)
  - list of civs
  - run button
- Architecture
  - General component architecture
  - General testing architecture
    - unit tests
    - 95%+ code coverage
  - General Styling architecture
    - spacing
    - colors
    - reasonable usability of app wide styles
  - General data flow architecture
    - basic api call for civ list
    - general practices for message passing within the app (potentially with redux store)
- API
  - The api for this app is in a separate project but the basic rest operations for civs should be implemented
- Hosting
  - App should be hosted somewhere and accessible from a web browser

## VERSION 2

### Custom list selection

- Features
  - The app should allow the user to limit the list of civs that can be randomly selected.
  - This custom list is reflected in the url. Future versions should include this feature as parameterization expands.
- Components
  - The customized civ pool should be highlighted in some way so it's clear which civs are being selected from. Future versions should updated this highlighted civ pool as the paramter options are updated.
- Architecture
  - custom civ pool

## VERSION 3

### Select civs by strengths

- Features
  - Shortcuts for random civ selection by general civ strengths such as strong archer, cavalry, or water civs.
- Components
  - UI for selecting from these options (menu?, modal?, buttons?)
- Architecture
  - the api architure for these types of filters should be implemented

## VERSION 4

### Explanations for selection

- Features
  - The main addition here is that the app will tell u something about why the civ was selected. For example, if u want to pick an archer civ and it randomly selects ethiopians, the app will show u the relevant bonuses like faster firing archers, arb, bracer and whatever else makes them a strong archer civ.
- Components
  - Another interesting feature might be that if u select knight civs for example and the pool of civs is highlighted, u can hover (or some other UI element like sidebar) will show the explanation for why each civ is in the pool.
- Architecture
  - The explanation should be returned by the api so architecture of the api will need to be expanded again here.

## VERSION 5+

### Fully parameterized random civ selection

- Features
  - More generic parameterization of random civ selection. See [Parameters for random selection section](#parameters-for-random-selection)
  - Not all of these need to be implemented at once, but this is a good time to start adding different parameterization options. Most likely this will happen over multiple verions (or at least minor versions).
- Components
  - further UI for paramterization

# Parameters for random selection

This section documents the potential parameters for randomizing the civ selection. This will be the place where we can add more ideas as we think of them.

- general strengths (version 3)
- unit line (e.g. archer, skirm, monk)
- unit group (e.g. range, barracks, siege)
- technology (e.g. arbalest, bracer, paladin, redemption)
- type of unique unit (e.g. cavalry archer, infantry)
- economic bonuses (e.g. food, wood, villager bonus)
- building (e.g. tc bonuses, castle bonuses)
- strong against certain unit or unit group (e.g. counters archers, counters cav, counters mangudai)
- map type (e.g. open, closed, hybrid, water)
- specific map (e.g. fortress, nomad)
- map position (e.g. flank, pocket)
- combinations of the above

## Technologies

### Frontend

- typescript
- react
- scss
- jest

### API

- typescript
- nestjs
- prisma
- postgres
- jest
