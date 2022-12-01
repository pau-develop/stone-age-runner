import {
  collisionTilesGround,
  collisionTilesSpikes,
  fruitPositions,
  maps,
  monkeyPositions,
} from "../data/mapData";
import Fruit from "./Fruit";
import Monkey from "./Monkey";

class Map {
  currentMap = 0;
  maps = maps;
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

      this.scrollingMap[i].ground.setCollision(collisionTilesGround);
      if (this.scrollingMap[i].spikes !== null) {
        this.scrollingMap[i].spikes.setCollision(collisionTilesSpikes);
      }
      const actualMap = this.currentMap;
      scene.physics.add.collider(hero, this.scrollingMap[i].ground);
      scene.physics.add.collider(hero, this.scrollingMap[i].spikes, () => {
        this.spikeCollision(hero, this.scrollingMap[i].spikes, actualMap);
      });
      if (monkeyGroup.length > 0) {
        monkeyGroup.forEach((monkey) => {
          scene.physics.add.collider(monkey, this.scrollingMap[i].ground);
          scene.physics.add.collider(monkey, this.scrollingMap[i].spikes);
        });
      }

      this.setMapPosition(i);

      this.setLayerDepth(i);

      this.currentMap++;

      this.addCollectibles(hero, scene, i, this.scrollingMap[i].ground);

      this.addMonkeys(
        scene,
        hero,
        i,
        this.scrollingMap[i].ground.x,
        monkeyGroup
      );
    }
  }

  setLayerDepth(currentMap: number) {
    this.scrollingMap[currentMap].ground.depth = -48;
    if (this.scrollingMap[currentMap].front !== null)
      this.scrollingMap[currentMap].front.depth = -46;
    if (this.scrollingMap[currentMap].spikes !== null)
      this.scrollingMap[currentMap].spikes.depth = -48;
    this.scrollingMap[currentMap].back.depth = -49;
  }

  setMapPosition(currentMap: number) {
    this.scrollingMap[currentMap].ground.x = currentMap * 2560;
    this.scrollingMap[currentMap].back.x = currentMap * 2560;
    if (this.scrollingMap[currentMap].front !== null)
      this.scrollingMap[currentMap].front.x = currentMap * 2560;
    if (this.scrollingMap[currentMap].spikes !== null)
      this.scrollingMap[currentMap].spikes.x = currentMap * 2560;
  }

  getMultiple(number) {
    if (number % 32 === 0) {
      return number / 32;
    } else {
      number++;
      return this.getMultiple(number);
    }
  }

  getRowAndColumn = (hero, currentMap) => {
    const mapStartPos = currentMap * 2560;
    const differenceBetweenHeroAndMap = Math.abs(
      mapStartPos - Math.round(hero.x)
    );
    const col = this.getMultiple(Math.round(hero.y + 22));
    const row = this.getMultiple(differenceBetweenHeroAndMap);
    return [row, col, mapStartPos];
  };

  spikeCollision(hero, tilemap, currentMap) {
    if (!hero.isSpiked) {
      if (hero.body.blocked.right) {
        hero.playSound(5);
        return;
      }
      if (hero.body.blocked.up) {
        hero.playSound(5);
        hero.body.velocity.x = 0;
        hero.body.velocity.y = 0;
        hero.isAlive = false;
        hero.isSpikedTop = true;
        return;
      }
      hero.playSound(5);
      hero.isSpiked = true;
      hero.isAlive = false;
      hero.playSound(5);
      hero.body.velocity.x = 0;
      hero.body.velocity.y = 0;
      this.camera.stopFollow();
      hero.body.setAllowGravity(false);
    }
  }

  getSound(sound) {
    this.eatFX = sound;
  }

  public shiftMaps(hero, monkeyGroup, scene) {
    if (hero.x >= this.scrollingMap[0].ground.x + 2560)
      this.scrollingMap.shift();
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
      this.scrollingMap[2].ground.setCollision(collisionTilesGround);
      this.scrollingMap[2].back.x = this.scrollingMap[1].ground.x + 2560;
      if (this.scrollingMap[2].front !== null)
        this.scrollingMap[2].front.x = this.scrollingMap[1].ground.x + 2560;
      if (this.scrollingMap[2].spikes !== null) {
        this.scrollingMap[2].spikes.x = this.scrollingMap[1].ground.x + 2560;
        this.scrollingMap[2].spikes.setCollision(collisionTilesSpikes);
      }

      this.addCollectibles(hero, scene, randomMap, this.scrollingMap[2].ground);

      this.addMonkeys(
        scene,
        hero,
        randomMap,
        this.scrollingMap[2].ground.x,
        monkeyGroup
      );

      const actualMap = this.currentMap;

      scene.physics.add.collider(hero, this.scrollingMap[2].ground);

      if (this.scrollingMap[2].spikes !== null)
        scene.physics.add.collider(hero, this.scrollingMap[2].spikes, () => {
          this.spikeCollision(hero, this.scrollingMap[2].spikes, actualMap);
        });

      this.currentMap++;
      this.setLayerDepth(2);
    }
  }

  addCollectibles(hero, scene, mapNumber, mapPosition) {
    if (mapNumber <= fruitPositions.length - 1) {
      fruitPositions[mapNumber].forEach((element) => {
        this.spawnFruits(
          hero,
          scene,
          element.col,
          element.row,
          mapPosition,
          element.type
        );
      });
    }
  }

  addMonkeys(scene, hero, mapNumber, mapPosition, monkeyGroup) {
    if (mapNumber <= monkeyPositions.length - 1) {
      monkeyPositions[mapNumber].forEach((element) => {
        monkeyGroup.push(
          new Monkey(
            scene,
            mapPosition + element.col * 32,
            element.row,
            "monkey",
            hero,
            this
          )
        );
      });
      monkeyGroup.forEach((monkey) => {
        this.scrollingMap.forEach((map) => {
          scene.physics.add.collider(monkey, map.ground);
          map.spikes !== null && scene.physics.add.collider(monkey, map.spikes);
        });
      });
    }
  }

  spawnFruits(hero, scene, col, row, mapPosition, fruitGroup) {
    for (let i = 0; i < fruitGroup.length; i++) {
      new Fruit(
        scene,
        mapPosition.x + col * 32 + fruitGroup[i].x,
        mapPosition.y + row * 32 - 16 + fruitGroup[i].y,
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
