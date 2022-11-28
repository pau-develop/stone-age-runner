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
      this.currentMap++;

      this.addCollectibles(hero, scene, i, this.scrollingMap[i].ground);

      // this.addMonkeys(
      //   scene,
      //   hero,
      //   i,
      //   this.scrollingMap[i].ground.x,
      //   monkeyGroup
      // );
    }
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
    console.log("HEROPOS", hero.x, hero.y);
    //FIND number
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

      const tilePosition = this.getRowAndColumn(hero, currentMap);

      if (tilePosition[0] !== undefined && tilePosition[1] !== undefined) {
        if (
          tilemap.layer.data[tilePosition[1] + 1][tilePosition[0] + 1] !==
            null &&
          tilemap.layer.data[tilePosition[1] + 1][tilePosition[0] + 1] !==
            undefined
        ) {
          if (
            tilemap.layer.data[tilePosition[1] + 1][tilePosition[0] + 1]
              .index === -1
          )
            hero.spikedX = tilePosition[2] + 32 * tilePosition[0] - 32;
          else hero.spikedX = tilePosition[2] + 32 * tilePosition[0];
        }
        hero.spikedY = (tilePosition[1] - 1) * 32;
        if (hero.spikedX > hero.x) hero.spikedXDir = 1;
        else if (hero.spikedX < hero.x) hero.spikedXDir = -1;
      }
    }
  }

  getSound(sound) {
    this.eatFX = sound;
  }

  public shiftMaps(hero, monkeyGroup, scene) {
    // REMOVE FIRST INDEX WHEN PLAYER REACHES x 2560
    if (hero.x >= this.scrollingMap[0].ground.x + 2560)
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
      console.log(this.scrollingMap[2]);
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

      // this.addMonkeys(
      //   scene,
      //   hero,
      //   randomMap,
      //   this.scrollingMap[2].ground.x,
      //   monkeyGroup
      // );
      const actualMap = this.currentMap;
      scene.physics.add.collider(hero, this.scrollingMap[2].ground);
      if (this.scrollingMap[2].spikes !== null)
        scene.physics.add.collider(hero, this.scrollingMap[2].spikes, () => {
          this.spikeCollision(hero, this.scrollingMap[2].spikes, actualMap);
        });
      this.currentMap++;
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
            mapPosition + element.col,
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
