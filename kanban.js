"use strict";

/*KanbanGrid
- column = { id: new KanbanColumn }
- items = { id: new KanbanItem }
*addItem
*addColumn
* moveItem
* draw

KanbanColumn
- items: []
render
addItem

KanbanItem*/

class KanbanGrid {
    constructor(options) {
        this.container = options.container;
        this.layout = {
        	container: null      	
        };

		this.columns = { /* id => KanbanColumn*/ };
		this.items = { /* id => KanbanItem*/ }
        this.loadData(options);
    };


    loadData(json) {

    	// options правильно переданы?
    	var options = {};
    	options.columns = json.columns;
        options.items = json.items;

    	if (options && Array.isArray(options.columns))
    	{
    		options.columns.forEach(function(column) {
    			this.addColumn(column);
    		}, this);
    	}
    	this.columns = options.columns;

    	if (options && Array.isArray(options.items))
    	{
    		options.items.forEach(function(item) {
    			this.addItem(item);
    		}, this);
    	}
    	this.items = options.items;
		this.items.forEach(function(item) {
			console.log(item);	
		}, this);

    }

	draw() {
		this.columns.forEach(function(column) {
			column.render;
		});

	}

    moveItem(sourceItem, column, targetItem = null) {

    }

    addColumn(options) {
    	var column = new KanbanColumn(options, this.container);
    	this.columns[column.getId()] = column; 
    };

    getColumn(id) {
    	if(this.columns[id - 1]){
    		return this.columns[id - 1];
    	}
    	return null;
    }

    removeColumn() {

    }

    addItem(options) {
    	
    	var item = new KanbanItem(options);
    	this.items[item.getId()] = item;

    	var currentColumn = this.getColumn(item.columnId);
    	console.log(currentColumn);
    	if (!currentColumn)
    	{
    		return null;
    	}
		currentColumn = new KanbanColumn(options, this.container)
    	currentColumn.addItem(item);
    }

    removeItem(item) {
    	//удалить из delete this.items[item.getId()]
    	//item.getColumn().removeItem(item);
    }
}

//класс KanbanColumn

class KanbanColumn {
    constructor(options, container) {
        this.id = options.id;
        this.name = options.name;
        this.container = container;
        this.items = [];
        var render = this.render();
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
	removeItem (item) {
		this.items = this.items.filter((currentItem, index) => {
			return currentItem !== item.index;
		});
	}


    render() {
    	let result = `<div class="kanban-column"><div class="kanban-column-title"></div><div class="kanban-column-price"></div>`;
    	this.items.forEach(function(item) {
    		result += item.render;
    	}, this);

    	result += `</div>`;
    	this.container.innerHTML += result;
    	return result;
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
        var render = this.render();

        this.layout = {
        	container: null,
        	input: null,
        	button: null
        };
    }

    getId() {
    	return this.id;
    }

    render() {
		console.log("добрались");
/*    	if (this.layout.container)
    	{
    		return this.layout.container;
    	}*/

/*    	this.layout.container = document.createElement("div");
    	this.layout.container.className = "";
    	this.layout.input = document.createElement("input");
    	this.layout.container.appendChild(this.layout.input);*/


    	return `<div class="kanban-column-title">' + column.name + '</div><div class="kanban-column-price"></div></div>`;
    }
}

//Создание
var kanban = new KanbanGrid({
/*	events: {
		onTitleChanged: function(column) {
			//ajax
		},

		onItemChanged: function(item) {
			//ajax
		}
	},*/
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