const SimpleStore = artifacts.require("SimpleStore");

contract('SimpleStore', (accounts) => {
  let instance
  before(async () => {
    instance = await SimpleStore.deployed()
  })
  describe('getValue', () => {
    it('should return the value', async () => {
      expect(await instance.getValue()).to.be.eq('Hello World')
    })
  })
  describe('setValue', () => {
    it('should update the value', async () => {
      let newValue = 'DevBootstrap'
      await instance.setValue(newValue, {from: accounts[0]})
      expect(await instance.getValue()).to.be.eq(newValue)
    })

    it('should cost a small amount of wei', async () => {
      gasPrice = await web3.eth.getGasPrice()
      balBefore = await web3.eth.getBalance(accounts[1])
      tx = await instance.setValue('Something new!!', {from: accounts[1]})
      gasPriceBN = web3.utils.toBN(gasPrice)
      gasUsedBN = web3.utils.toBN(tx.receipt.gasUsed)
      txFee = gasPriceBN.mul(gasUsedBN)
      balAfter = await web3.eth.getBalance(accounts[1])
      balBeforeBN = web3.utils.toBN(balBefore)
      balAfterBN = web3.utils.toBN(balAfter)
      diff = balBeforeBN.sub(balAfterBN)
      expect(diff.eq(txFee)).to.be.true
    })
  })
})
