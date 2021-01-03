const SHA256 = require('crypto-js/sha256');

    
// ? Node Structure (How each block looks like when present inside a blockchain)

class node_block{
    constructor(timestamp, data, prevHashCode = ''){
        this.timestamp = timestamp;
        this.data = data;
        this.prevHashCode = prevHashCode;
        this.nonce = 0;
        this.hashCode = this.calcHashCode();
    }

    calcHashCode(){
        return SHA256(this.prevHashCode + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }


    mineBlock(difficulty){
        while(this.hashCode.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ // * [0,0,0,0]......upto difficulty]
            this.nonce++;
            this.hashCode = this.calcHashCode();
          //console.log(this.hashCode);
        }
        console.log("Block mined: " + this.hashCode);
        console.log();
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createHeadBlock()];
        this.difficulty = 2;
    }

    createHeadBlock(){
        return new node_block("08/08/2000", "Head Block", "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(new_node){
       new_node.prevHashCode = this.getLastBlock().hashCode; 
       new_node.mineBlock(this.difficulty);
       this.chain.push(new_node);
    }

    isBlockChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            var currBlock = this.chain[i];
            var prevBlock = this.chain[i - 1];
         
            if(currBlock.hashCode !== currBlock.calcHashCode()){
                return false;
            }

            if(currBlock.prevHashCode !== prevBlock.hashCode){
                return false;
            }
        }
        return true;
    }
}


let my_chain = new Blockchain();
console.log("Mining Block 1");
my_chain.addBlock(new node_block(Date.now(), {data: 400}));

console.log("Mining Block 2");
my_chain.addBlock(new node_block(Date.now(), { data: 800 }));

console.log("Mining Block 3");
my_chain.addBlock(new node_block(Date.now(), { data: 1200 }));

console.log("Mining Block 4");
my_chain.addBlock(new node_block(Date.now(), { data: 1600 }));

console.log("Mining Block 5");
my_chain.addBlock(new node_block(Date.now(), { data: 2000 }));

console.log("Mining Block 6");
my_chain.addBlock(new node_block(Date.now(), { data: 2400 }));


console.log(JSON.stringify(my_chain, null, 4));


console.log(my_chain.isBlockChainValid());

my_chain.chain[1].data = {data : 1600};

console.log(my_chain.isBlockChainValid());