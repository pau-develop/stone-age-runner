class Map {
  maps = [
    "assets/tiles/map0.json",
    "assets/tiles/map1.json",
    "assets/tiles/map2.json",
    "assets/tiles/map3.json",
  ];
  scrollingMap = new Array(3);

  public instantiateMap(hero, scene) {
    for (let i = 0; i < this.scrollingMap.length; i++) {
      const map = scene.make.tilemap({ key: `tilemap${i}` });
      this.scrollingMap[i] = map.createLayer(
        "ground",
        map.addTilesetImage("wild", "tiles")
      );
      map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      scene.physics.add.collider(hero, this.scrollingMap[i]);

      if (i === 0) this.scrollingMap[i].x = 0;
      if (i === 1) this.scrollingMap[i].x = 640;
      if (i === 2) this.scrollingMap[i].x = 1280;
    }
  }

  public shiftMaps(hero, scene) {
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
    }
  }
}

export default Map;
