class MemoryCache {
    constructor() {
      this.cacheToken = {};
    }
  
    async storeToken(phoneNumber, accessToken) {
      this.cacheToken[phoneNumber] = { accessToken };
    }
  
    async getTokenEntry(phoneNumber) {
      return this.cacheToken[phoneNumber];
    }
  
    async deleteTokenEntry(phoneNumber) {
      delete this.cacheToken[phoneNumber];
    }
  }
  

  module.exports = MemoryCache;