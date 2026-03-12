# My Dream Game Engine
This document is prepared to convey my own demands for a game engine and to be a future reference if i decided to make my own game engine.

## Separate Tools For Everything
One of the features of all modern game engines that i hate is being a single editor that try to cover every part of the production. Developers, level designers, techincal artists, animators... All of them use the same editor for their job. That may sound like a good thing but it almost always lead to conflicts between different people. For example a developer and a level designer would eventually have to work on the same prefab, and the resulting merge conflicts are not as easy as resolving a merge conflict between code files. All other production branch must create their own resources on their own tools, then developer would only have to parse and integrate these resources through code. We already do this today with 2D textures and audios. Artists and sound designers create the necessary resource for the game with their respective tools, and the developers only have to integrate these into the game. Today there is no need for artists and sound guys to touch the engine anyways, then why should there be for the others? Image artists, sound designers, composers doing their job on the editor too. That would make the editors even more bloated and complicated than they are today. Having separate softwares for every distinct part of the game development would make everyone's job more simplified, we would have more performant softwares and there won't be conflicts between different development branches since developers would only read and parse a resource that no one except the creator of that resource have the responsibility to mutate it. And do you what would having separate software for everyone result in?

## Game Engine Itself Is Just a Collection Of Libraries
Yes! Developers have no need to use an editor. Their sole responsiblity is writing the code to create a software that incorporates the resources created. Since now every production branch have their own software the create the parts of the game, developers no longer have to stick these resources together via a bloated and unbelivably slow editors. They can now just load these resources from disk, unserialize them and use it right away. Then just compile the project and VOILA! Then just test the game with that compiled executable. We don't have to deal with the bloat of a modern game engine just for it to "emulate" the game.

## Just The Core Necessary And Mutable Features
Modern game engines are filled with all these components and features, that we only used maybe the one-tenth of all, through our whole game development journey. And when we start using a couple components, as project goes on, we stop using half of them and write our own solutions because either they are unnecessarily complicated or we are not allowed to alter their functionaly to our own neeeds. Or another aspect of that is physics systems. Modern game engines force us to use their physics system even for minimal features. Huge portion of games are not designed have physics but eventually they have to use the physics system of the engine to have a simple feature like collisions or bounces. The developers then try to supress the unwanted results of using a physics system for core parts of the game, which isn't a great idea since there are always bugs left unfixed such as main character launching air in high speeds just because the player entered a narrow pit; or the developers make the rigidbodies kinematic and write their whole system, which also makes me think "Then why we have to use the physics system of the engine in the first place?". So the game engine should only have these features and thats it:
- Window creation and management
- File IO
- Deseralization of supported resources (textures, audio, meshes, shaders, resource packs?)
- 2D rendering
- 3D rendering including an open-to-improve rendering pipeline
- Keyboard/Gamepad/Mouse Input handling
- Basic audio playing (Nothing complicated, most games use 3rd party solutions such as fmod or wwise anyway)
- Vector/Quaternion/Matrix Math
- Overlap checking for various shapes (Square, Circle, Polygon, Cube, Sphere, Capsule, Mesh) with orientation
- Ray/Line casting
- Debugging Tools (Hot reload support, in-game console, in-game visual debugging--like unity's gizmos or handles--)
- No Physics Included, developers can import any they prefer whether it be PhysX, Box2D, Havoc etc
- No Scene Graph/ECS or similar, developers are free to use their own system of need
- No Prefabs/Blueprints, because of the previous point
- No UI, most developers today write their own ui systems rather than use the engine's anyways
- No networking, use something like ENet or write your own system via sockets or requests