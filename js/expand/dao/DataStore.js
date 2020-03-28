import { AsyncStorage } from "react-native";

export default class DataStore {
  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then(wrapdata => {
        if (wrapdata && DataStore.checkTimestampValid(wrapdata.timestamp))
          resolve(wrapdata);
        else {
          this.fetchNetworkData(url)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    });
  }

  saveData(url, data, callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  _wrapData(data) {
    return { data: data, timestamp: new Date().getTime() };
  }

  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (error) {
            reject(error);
            console.log(error);
          }
        } else {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  fetchNetworkData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network Response Error");
        })
        .then(responseData => {
          this.saveData(url, responseData);
          resolve(responseData);
        })
        .catch(error => {
          reject(error);
          error && console.log(error);
        });
    });
  }

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setDate(timestamp);

    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false; //valid period

    return true;
  }
}
