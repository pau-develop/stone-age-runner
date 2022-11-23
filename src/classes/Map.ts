import { fruitGroups, fruitPositions, monkeyPositions } from "../data/mapData";
import Fruit from "./Fruit";
import Monkey from "./Monkey";

class Map {
  maps = [
    "assets/tiles/map0.json",
    "assets/tiles/map1.json",
    "assets/tiles/map2.json",
    "assets/tiles/map3.json",
    "assets/tiles/map4.json",
    "assets/tiles/map5.json",
    "assets/tiles/map6.json",
    "assets/tiles/map0s.json",
    "assets/tiles/map1s.json",
    "assets/tiles/map2s.json",
    "assets/tiles/map3s.json",
    "assets/tiles/map4s.json",
    "assets/tiles/map5s.json",
    "assets/tiles/map6s.json",
  ];
  scrollingMap = new Array(3);
  camera;
  scene;
  eatFX;
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
  }
  public instantiateMap(hero, monkeyGroup, scene) {
    for (let i = 0; i < this.scrollingMap.length; i++) {
      const map = scene.make.tilemap({ key: `tilemap${i}` });
      this.scrollingMap[i] = {
        ground: map.createLayer("ground", map.addTilesetImage("wild", "tiles")),
        back: map.createLayer("back", map.addTilesetImage("wild", "tiles")),
        front: map.createLayer("front", map.addTilesetImage("wild", "tiles")),
        spikes: map.createLayer("spikes", map.addTilesetImage("wild", "tiles")),
      };
      //NO 1,2,3,4,5,6,9,10,11,14,15,18
      //SI 7,8,12,13,16,17
      this.scrollingMap[i].ground.setCollision([
        7, 8, 12, 13, 14, 16, 17, 18, 26, 28, 30, 34, 37, 40, 41, 42, 51,
      ]);
      if (this.scrollingMap[i].spikes !== null) {
        this.scrollingMap[i].spikes.setCollision([
          61, 62, 21, 22, 23, 33, 34, 35, 45, 46, 47,
        ]);
      }
      scene.physics.add.collider(hero, this.scrollingMap[i].ground);
      scene.physics.add.collider(hero, this.scrollingMap[i].spikes, () => {
        console.log("SPAIKUUU");
      });
      if (monkeyGroup.length > 0) {
        monkeyGroup.forEach((monkey) => {
          scene.physics.add.collider(monkey, this.scrollingMap[i].ground);
          scene.physics.add.collider(monkey, this.scrollingMap[i].spikes);
        });
      }
      // debugger;
      if (i === 0) {
        this.scrollingMap[i].ground.x = 0;
        this.scrollingMap[i].back.x = 0;
        if (this.scrollingMap[i].front !== null)
          this.scrollingMap[i].front.x = 0;
        if (this.scrollingMap[i].spikes !== null)
          this.scrollingMap[i].spikes.x = 0;
      }
      if (i === 1) {
        this.scrollingMap[i].ground.x = 2560;
        this.scrollingMap[i].back.x = 2560;
        if (this.scrollingMap[i].front !== null)
          this.scrollingMap[i].front.x = 2560;
        if (this.scrollingMap[i].spikes !== null)
          this.scrollingMap[i].spikes.x = 2560;
      }
      if (i === 2) {
        this.scrollingMap[i].ground.x = 5120;
        this.scrollingMap[i].back.x = 5120;
        if (this.scrollingMap[i].front !== null)
          this.scrollingMap[i].front.x = 5120;
        if (this.scrollingMap[i].spikes !== null)
          this.scrollingMap[i].spikes.x = 5120;
      }
    }
  }

  getSound(sound) {
    this.eatFX = sound;
  }

  public shiftMaps(hero, monkeyGroup, scene) {
    // REMOVE FIRST INDEX WHEN PLAYER REACHES x 640
    if (hero.x >= this.scrollingMap[0].ground.x + 1280)
      this.scrollingMap.shift();
    // ADD IT TO THE END OF THE ARRAY
    if (this.scrollingMap.length < 3) {
      const randomMap = Math.floor(Math.random() * this.maps.length);
      const map = scene.make.tilemap({ key: `tilemap${randomMap}` });

      this.scrollingMap.push({
        ground: map.createLayer("ground", map.addTilesetImage("wild", "tiles")),
        back: map.createLayer("back", map.addTilesetImage("wild", "tiles")),
        front: map.createLayer("front", map.addTilesetImage("wild", "tiles")),
        spikes: map.createLayer("spikes", map.addTilesetImage("wild", "tiles")),
      });
      this.scrollingMap[2].ground.x = this.scrollingMap[1].ground.x + 2560;

      this.scrollingMap[2].back.x = this.scrollingMap[1].ground.x + 2560;
      if (this.scrollingMap[2].front !== null)
        this.scrollingMap[2].front.x = this.scrollingMap[1].ground.x + 2560;
      if (this.scrollingMap[2].spikes !== null)
        this.scrollingMap[2].spikes.x = this.scrollingMap[1].ground.x + 2560;
      this.scrollingMap[2].ground.setCollision([
        7, 8, 12, 13, 14, 16, 17, 18, 26, 28, 30, 34, 37, 40, 41, 42, 51,
      ]);
      if (this.scrollingMap[2].spikes !== null) {
        this.scrollingMap[2].spikes.setCollision([
          61, 62, 21, 22, 23, 33, 34, 35, 45, 46, 47,
        ]);
      }

      this.addCollectibles(hero, scene, randomMap, this.scrollingMap[2]);
      this.addMonkeys(
        scene,
        hero,
        randomMap,
        this.scrollingMap[2].ground.x,
        monkeyGroup
      );
      scene.physics.add.collider(hero, this.scrollingMap[2].ground);
      if (this.scrollingMap[2].spikes !== null)
        scene.physics.add.collider(hero, this.scrollingMap[2].spikes, () => {
          console.log("SPAIKUUU");
        });
    }
  }

  addCollectibles(hero, scene, mapNumber, mapPosition) {
    if (mapNumber <= fruitPositions.length - 1) {
      this.spawnFruits(
        hero,
        scene,
        fruitPositions[mapNumber].x,
        fruitPositions[mapNumber].y,
        mapPosition,
        fruitPositions[mapNumber].type
      );
    }
  }

  addMonkeys(scene, hero, mapNumber, mapPosition, monkeyGroup) {
    if (mapNumber <= monkeyPositions.length - 1) {
      monkeyGroup.push(
        new Monkey(
          scene,
          mapPosition + monkeyPositions[mapNumber].x,
          monkeyPositions[mapNumber].y,
          "monkey",
          hero,
          this
        )
      );
      monkeyGroup.forEach((monkey) => {
        scene.physics.add.collider(monkey, this.scrollingMap[0].ground);
        scene.physics.add.collider(monkey, this.scrollingMap[1].ground);
        scene.physics.add.collider(monkey, this.scrollingMap[2].ground);

        if (this.scrollingMap[0].spikes !== null)
          scene.physics.add.collider(monkey, this.scrollingMap[0].spikes);
        if (this.scrollingMap[1].spikes !== null)
          scene.physics.add.collider(monkey, this.scrollingMap[1].spikes);
        if (this.scrollingMap[2].spikes !== null)
          scene.physics.add.collider(monkey, this.scrollingMap[2].spikes);
      });
    }
  }

  spawnFruits(hero, scene, xPos, yPos, mapPosition, fruitGroup) {
    for (let i = 0; i < fruitGroup.length; i++) {
      new Fruit(
        scene,
        mapPosition.x + xPos + fruitGroup[i].x,
        mapPosition.y + yPos + fruitGroup[i].y,
        "fruits",
        Math.round(Math.random() * 4),
        hero,
        i % 2 === 0 ? 1 : -1,
        this.eatFX
      );
    }
  }
}

export default Map;
