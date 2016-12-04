"use strict";

class KanbanGrid {
    constructor(options) {
        this.layout = {
        	container: options.container      	
        };

		this.columns = { /* id => KanbanColumn*/ };
		this.items = { /* id => KanbanItem*/ };
        this.loadData(options);
    };


    loadData(json) {

         this.columns = json.columns; 
         this.items = json.items;   

    	if (json && Array.isArray(this.columns))
    	{
    		this.columns.forEach(function(column) {
    			this.addColumn(column);
    		}, this);
    	}
	
    	if (json && Array.isArray(this.items))
    	{
    		this.items.forEach(function(item) {
    			this.addItem(item);
    		}, this);
    	} 	

	}

	draw() {
		this.columns.forEach(function(column) {
			column.render(this.items);
            column.addPrice(this.items)
		}, this);
	}

    moveItem(sourceItem, column, targetItem = null) {
    	this.trigger('move', {
/*    		sourceItem,
    		column,
			targetItem*/
		});
    }

    addColumn(column) {
    	column = new KanbanColumn(column, this.layout.container);
    	this.columns[column.getId() - 1] = column;
    };

    getColumn(id) {
    	if(this.columns[id]){
    		return this.columns[id];
    	}
    	return null;
    }

    removeColumn(removedColumn) {
		this.columns = this.columns.filter((column, index) => {
			return index !== removedColumn.index;
		});
    }

    addItem(item) {

    	item = new KanbanItem(item);
    	this.items[item.getId() - 1] = item; 

    	var currentColumn = this.getColumn(item.columnId - 1);
    	if (!currentColumn) {
	    	return null;
	    };
    	currentColumn.addItem(item);
    }

    removeItem(item) {
    	delete this.items[item.getId() - 1];
    	this.columns[item.columnId].removeItem(item);
    }

	/**
	* Возможность подписываться на событие
	*/
	on (name, callback) {
		this.layout.container.addEventListener(name, callback);
	}

	/**
	* Создаем событие
	*/
	trigger(name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});
		this.layout.container.dispatchEvent(widgetEvent);
	}

}

//класс KanbanColumn

class KanbanColumn {
    constructor(column, container) {
        this.id = column.id;
        this.name = column.name;
        this.container = container;
        this.items = [];
    };

    getId() {
    	return this.id;
    }

    addItem(item) {
    	if (item instanceof KanbanItem)
    	{
    		this.items.push(item);
    	}
    }

    //удаление item
	removeItem (removedItem) {
		this.items = this.items.filter((item, index) => {
			return index !== removedItem.index;
		});
	}

    render(items) {
    	let result = '<div class="kanban-column"><div class="kanban-column-title">' + this.name + '</div><div class="kanban-column-price"></div>';

    	items.forEach(function(item) {
    		if(this.id == item.columnId) { 
    			result += item.render().outerHTML;		
    		};
    	}, this);

    	result += `</div>`;
    	this.container.innerHTML += result;

    	return result;
    }

    addPrice(items) {
    	let currentItem = null;
		let price = null; 

    	items.forEach(function(item) {
    		if(this.id == item.columnId) {

	    		if(currentItem == item.columnId || item.columnId) {
		    		price += item.getPrice(); 		
	    		}
    			currentItem = item.columnId; 	
    		};
    	}, this);

        console.log(price); 
        return price;

/*    	var prices = document.getElementsByClassName("kanban-column-price");
    	console.log(prices + " : " + price);

    	for(var i = 0; i < prices.length; i++) {
    		console.log(prices[i]);
    	}*/	
    }

}

//класс KanbanItem

class KanbanItem {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.columnId = options.columnId;
        this.price = options.price;
        this.autorName = options.autorName;
        this.date = options.date;

        this.layout = {
        	container: null
        };
    }

    getId(items) {
    	return this.id;
    }

    getPrice() {
    	return this.price;
    }

    render() {
    	if (this.layout.container) {
    		return this.layout.container;
    	}

    	this.layout.container = document.createElement("div");
    	this.layout.container.className = "kanban-item";

    	this.layout.name = document.createElement("div");
    	this.layout.name.className = "kanban-item-name";
    	this.layout.name.textContent = this.name;
    	this.layout.container.appendChild(this.layout.name);

    	this.layout.price = document.createElement("div");
    	this.layout.price.className = "kanban-item-price";
    	this.layout.price.textContent = this.price;
    	this.layout.container.appendChild(this.layout.price);

    	this.layout.author = document.createElement("div");
    	this.layout.author.className = "kanban-item-author";
    	this.layout.container.appendChild(this.layout.author);

    	this.layout.authorLink = document.createElement("a");
    	this.layout.authorLink.className = "kanban-item-author-link";
    	this.layout.authorLink.textContent = this.autorName;
    	this.layout.author.appendChild(this.layout.authorLink);

    	this.layout.date = document.createElement("div");
    	this.layout.date.className = "kanban-item-date";
    	this.layout.date.textContent = this.date;
    	this.layout.container.appendChild(this.layout.date);	

    	return this.layout.container;
    }

    getColumnId() {
    		return this.columnId;
    	}
}

//Создание
var kanban = new KanbanGrid({
	events: {
		onTitleChanged: function(column) {
			//ajax
		},

		onItemChanged: function(item) {
			//ajax
		}
	},
    columns: [
        {
            id: 1,
            name: "Первичный контакт"
        },
        {
            id: 2,
            name: "Переговоры по сделке"
        },
        {
            id: 3,
            name: "Договор"
        },
        {
            id: 4,
            name: "Оплата"
        },
        {
            id: 5,
            name: "Завершение сделки"
        }
    ],
    items: [
        {
            id: 1,
            name: "Продажа оборудования для производства корма",
            link: "/link",
            columnId: 2,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 2,
            name: "Постирать носки с мегакрутым отбеливателем",
            link: "/link",
            columnId: 2,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 3,
            name: "Покормить пса новым кормом",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 4,
            name: "Пменить наполнитель в лотке у кота",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 5,
            name: "Поменять резину",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 6,
            name: "Позвонить маме",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 7,
            name: "Забрать вещи из химчистки",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 8,
            name: "Устроить денежный дождь в стрипклубе",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 9,
            name: "Написать письмо в будущее самому себе. Вскрыть через 10 лет.",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 10,
            name: "Организовать кинотеатр под открытым небом и приглашать всех вокруг на бесплатный просмотр.",
            link: "/link",
            columnId: 4,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 11,
            name: "Купить ведро винограда на рынке и высыпав в ванную начать топтать его босыми ногами делая вино. Только бы участковый не заподозрил тебя в сомнительных делах.",
            link: "/link",
            columnId: 5,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        }
    ],
    container: document.getElementById("kanban")
});

kanban.draw();


