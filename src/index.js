/**
 * Returns a function to avoid eager execution of window.sqlitePlugin.openDatabase
 * 
 */
export const sqlLiteStorage = () => {
  let db = window.sqlitePlugin.openDatabase({
      name: 'redux-store-db',
      location: 'default',
  });

  return {
      getItem(key) {
          return new Promise((resolve, reject) => {
              try {
                  db.transaction(tx => {
                      tx.executeSql('CREATE TABLE IF NOT EXISTS redux_store (key, value)', []);
                      tx.executeSql('SELECT value FROM redux_store WHERE key = ?', [key], (tx, rs) => {
                          resolve(rs.rows.item(0).value)
                      });
                  }, err => {
                      reject(err)
                  }, res => {
                      resolve(res)
                  })
              } catch (err) {
                  console.error(err)
                  reject(err)
              }
          })
      },

      setItem(key, value) {
          return new Promise((resolve, reject) => {
              db.transaction(tx => {
                  tx.executeSql('UPDATE redux_store SET value = ? WHERE key = ?', [value,key]);
              }, err => {
                  reject(err)
              }, res => {
                  resolve(res)
              })
          })
      },
      removeItem(key) {
          return new Promise((resolve, reject) => {
              db.transaction(tx => {
                  tx.executeSql('DELETE FROM redux_store WHERE key = ?', [key]);
              }, err => {
                  reject(err)
              }, res => {
                  console.log(res)
                  resolve(res)
              })
          })
      },
  }
}