import { fruitGroups, fruitPositions } from "../data/fruitData";
import Fruit from "./Fruit";

class Map {
  maps = [
    "assets/tiles/map0.json",
    "assets/tiles/map1.json",
    "assets/tiles/map2.json",
    "assets/tiles/map3.json",
  ];
  scrollingMap = new Array(3);

  public instantiateMap(hero, monkeyGroup, scene) {
    for (let i = 0; i < this.scrollingMap.length; i++) {
      const map = scene.make.tilemap({ key: `tilemap${i}` });
      this.scrollingMap[i] = map.createLayer(
        "ground",
        map.addTilesetImage("wild", "tiles")
      );
      map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      scene.physics.add.collider(hero, this.scrollingMap[i]);
      if (monkeyGroup.length > 0) {
        monkeyGroup.forEach((monkey) =>
          scene.physics.add.collider(monkey, this.scrollingMap[i])
        );
      }

      if (i === 0) this.scrollingMap[i].x = 0;
      if (i === 1) this.scrollingMap[i].x = 640;
      if (i === 2) this.scrollingMap[i].x = 1280;
    }
  }

  public shiftMaps(hero, monkeyGroup, scene) {
    //REMOVE FIRST INDEX WHEN PLAYER REACHES x 640
    if (hero.x >= this.scrollingMap[0].x + 640) this.scrollingMap.shift();
    //ADD IT TO THE END OF THE ARRAY
    if (this.scrollingMap.length < 3) {
      const randomMap = Math.floor(Math.random() * this.maps.length);
      const map = scene.make.tilemap({ key: `tilemap${randomMap}` });
      this.scrollingMap.push(
        map.createLayer("ground", map.addTilesetImage("wild", "tiles"))
      );
      this.scrollingMap[2].x = this.scrollingMap[1].x + 640;
      map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      scene.physics.add.collider(hero, this.scrollingMap[2]);
      if (monkeyGroup.length > 0) {
        monkeyGroup.forEach((monkey) => {
          scene.physics.add.collider(monkey, this.scrollingMap[2]);
        });
      }
      this.addCollectibles(hero, scene, randomMap, this.scrollingMap[2]);
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

  spawnFruits(hero, scene, xPos, yPos, mapPosition, fruitGroup) {
    for (let i = 0; i < fruitGroup.length; i++) {
      new Fruit(
        scene,
        mapPosition.x + xPos + fruitGroup[i].x,
        mapPosition.y + yPos + fruitGroup[i].y,
        "fruits",
        Math.round(Math.random() * 4),
        hero,
        i % 2 === 0 ? 1 : -1
      );
    }
  }
}

export default Map;
