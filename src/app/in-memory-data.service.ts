import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const productos = [
      { id: 0,  name: 'Taza', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:3,cantidad:5 },
      { id: 2,  name: 'Plato', descripcion:'Grande',precio:12412,foto:"taza.jpg",tipo:3,cantidad:5 },
      { id: 3,  name: 'Tenedor', descripcion:'Grande',precio:13212,foto:"taza.jpg",tipo:3,cantidad:5 },
      { id: 4,  name: 'Jean', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:2,cantidad:5 },
      { id: 5,  name: 'Remera', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:2,cantidad:5 },
      { id: 7,  name: 'Zapato', descripcion:'Grande',precio:12162,foto:"taza.jpg",tipo:2,cantidad:5 },
      { id: 8,  name: 'Toyota', descripcion:'Grande',precio:12182,foto:"taza.jpg",tipo:4,cantidad:5 },
      { id: 1,  name: 'Desodorante', descripcion:'Grande',precio:12912,foto:"taza.jpg",tipo:3,cantidad:5 },
      { id: 10,  name: 'Silla', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:3,cantidad:5 },
      { id: 11,  name: 'Hamburguesa', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:1,cantidad:5 },
      { id: 12,  name: 'Pancho', descripcion:'Grande',precio:1212,foto:"taza.jpg",tipo:1,cantidad:5 },
    ];
    return {productos};
  }
}
/*tipo1:comestible
tipo2: vestimenta
tipo3: hogar
tipo4: vehiculo*/