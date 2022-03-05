function Node(val){
    this.val = val;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList(array = []){
    this.head = null;
    this.tail = null;
    this.length = 0;

    if(Array.isArray(array)){
        array.forEach(el => {
            this.push(el);
        });
    }
}

DoublyLinkedList.prototype.push = function(val){
    const node = new Node(val);

    if (!this.length) {
        this.head = node;
        this.tail = node;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;

    this.length++;
    return this;
}

DoublyLinkedList.prototype.unshift = function(val){
    const node = new Node(val);

    if (!this.length) {
        this.head = node;
        this.tail = node;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;

    this.length++;
    return this;
}

DoublyLinkedList.prototype.insert = function(index, val){
    if (index < 0 || index >= this.length) return undefined;

    const node = new Node(val);
    let current = this.head;
    let counter = 0;
    
    while (current) {
        if (counter === index - 1) break;
        current = current.next;
        counter++;
    }

    node.prev = current;
    node.next = current.next;
    current.next = node;
    this.length++;

    return this.length;
}


DoublyLinkedList.prototype.getNode = function(index){
    if (index < 0 || index >= this.length) return undefined;

    let current = this.head;
    let counter = 0;

    while (current) {
        if(counter === index) break;
        counter++;
        current = current.next;
    }

    return current;
}

DoublyLinkedList.prototype.get = function(index){
    let node = this.getNode(index);
    return node ? node.val : null;
}

DoublyLinkedList.prototype.set = function(index, val){
    let node = this.getNode(index);
    
    if (node) {
        node.val = val;
        return true;
    }

    return false;
}

DoublyLinkedList.prototype.pop = function(){
    if (!this.length) return undefined;

    let removedNode = this.tail;
    this.tail = removedNode.prev;
    removedNode.prev = null;
    removedNode.next = null;

    this.length--;
    return removedNode.val;
}

DoublyLinkedList.prototype.shift = function(){
    if (!this.head) return undefined;

    let removedNode = this.head;
    this.head = removedNode.next;

    this.length--;
    return removedNode.val;
}

DoublyLinkedList.prototype.remove = function(index){
    if (index < 0 || index >= this.length) return undefined;
    
    let removedNode = null;
    if (this.length === 1) removedNode = this.shift();
    else {
        let previousNode = this.getNode(index -1)
        removedNode = previousNode.next
        previousNode.next = previousNode.next.next
        removedNode.next = null
    }

    this.length--;
    return removedNode;
}

DoublyLinkedList.prototype.reverse = function(){
    if (!this.head) return undefined;

    let current = this.head;
    this.head = this.tail; 
    this.tail = current; 

    for (let i = 0; i < this.length; i++) {
        const { next, prev } = current;
        current.prev = next
        current.next = prev
        current = next;
    }

    return this;
}