const BigNumber = require('bignumber.js');
const truffleAssert = require('truffle-assertions');

const NFTMock = artifacts.require("NFTMock");
const CommunityMock = artifacts.require("CommunityMock");
const ERC20Mintable = artifacts.require("ERC20Mintable");


contract('NFT', (accounts) => {
    
    // Setup accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];
    const accountFourth = accounts[3];
    const accountFive = accounts[4];
    
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    
    const noneExistTokenID = '99999999';
    var NFTMockInstance, CommunityMockInstance;
    
    let tmpTr;
    
    before(async () => {
        CommunityMockInstance = await CommunityMock.new({ from: accountFive });
        NFTMockInstance = await NFTMock.new({ from: accountFive });
        await NFTMockInstance.initialize('NFT-title', 'NFT-symbol', [CommunityMockInstance.address, "members"], { from: accountFive });
        
    });
    // beforeEach(async () => {
    // });
    it('should mint ', async () => {
        await NFTMockInstance.mint("MyFirstNFT", "http://google.com", ["0x0000000000000000000000000000000000000000", "1000000000000000000"], {from: accountFive});
        
    });
    
    it('should transfer Ownership and Authorship', async () => {
        tmpTr = await NFTMockInstance.mint("MyFirstNFT2", "http://google.com", ["0x0000000000000000000000000000000000000000", "1000000000000000000"], {from: accountFive});
        
        var tokenID = tmpTr.logs[0].args[1].toString(); 
        
        
        let authorOld = await NFTMockInstance.authorOf(tokenID);
        let ownerOld = await NFTMockInstance.ownerOf(tokenID);
        
        await truffleAssert.reverts(
            NFTMockInstance.authorOf(noneExistTokenID),
            'NFTAuthorship: author query for nonexistent token'
        );
        
        await truffleAssert.reverts(
            NFTMockInstance.ownerOf(noneExistTokenID),
            'ERC721: owner query for nonexistent token'
        );
        
        //try to change owner
        let ownerNew = accountOne;
        
        // imitate none-owner transfer
        await truffleAssert.reverts(
            NFTMockInstance.approve(ownerNew, tokenID, {from: accountFourth}),
            'ERC721: approve caller is not owner nor approved for all'
        );
        
        // await truffleAssert.reverts(
        //     NFTMockInstance.transferFrom(accountFourth, ownerNew, tokenID, {from: accountFourth}),
        //     'ERC721: transfer of token that is not own'
        // );
        
        
        await NFTMockInstance.approve(ownerNew, tokenID, {from: ownerOld});
        await NFTMockInstance.transferFrom(ownerOld, ownerNew, tokenID, {from: ownerOld});
        
        let ownerNewConfirm = await NFTMockInstance.ownerOf(tokenID);

        assert.isTrue(
            (
                (ownerOld != ownerNew) &&
                (ownerNew == ownerNewConfirm)
            ), 
            "transferOwnership was failed"
        );
        
        
        //try to change author
        let authorNew = accountTwo;
        await truffleAssert.reverts(
            NFTMockInstance.transferAuthorship(authorNew, tokenID, {from: accountFourth}),
            'NFTAuthorship: caller is not author'
        );
        await truffleAssert.reverts(
            NFTMockInstance.transferAuthorship(authorOld, tokenID, {from: authorOld}),
            'NFTAuthorship: transferAuthorship to current author'
        );
        
        await NFTMockInstance.transferAuthorship(authorNew, tokenID, {from: authorOld});
        
        let authorNewConfirm = await NFTMockInstance.authorOf(tokenID);
        assert.isTrue(
            (
                (authorOld != authorNew) &&
                (authorNew == authorNewConfirm)
            ), 
            "transferuthorship was failed"
        );
        
    });
    
    it('should reward by eth to author', async () => {
        tmpTr = await NFTMockInstance.mint("MyFirstNFT2", "http://google.com", ["0x0000000000000000000000000000000000000000", "1000000000000000000"], {from: accountOne});
        
        var tokenID = tmpTr.logs[0].args[1].toString();
    });
    it('should reward by tokens to author', async () => {
        
    });
    
    
    // await objThis.TradedTokenContractMockInstance._updateRestrictionsAndRules(objThis.TransferRulesInstance.address, { from: accountTen });
    //     await truffleAssert.reverts(
    //         objThis.TradedTokenContractMockInstance._updateRestrictionsAndRules(objThis.TransferRulesInstance.address, { from: accountTen }),
    //         'external contract already set'
    //     );
});