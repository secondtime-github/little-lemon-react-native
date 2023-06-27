import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menu (id integer primary key not null, name text, description text, price text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  const values = menuItems.map(({ name, description, price, image, category }, index) =>
    `(${index}, "${name}", "${description}", "${price}", "${image}", "${category}")`
  ).join(", ");
  db.transaction((tx) => {
    tx.executeSql(`insert into menu (id, name, description, price, image, category) values ${values}`);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    const activeCategoriesString = activeCategories.map(category => `"${category.toLowerCase()}"`).join(",");
    db.transaction((tx) => {
      tx.executeSql(`select * from menu WHERE name like '%${query}%' and category IN (${activeCategoriesString})`,
        [], (_, { rows }) => {
          resolve(rows._array);
        });
    });
  });
}
