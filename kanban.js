"use strict";

class KanbanGrid {
    constructor(options) {
        this.layout = {
        	container: options.container,
            kanban: null
        };

		this.columns = {};
		this.items = {};
        this.loadData(options);
    };

    loadData(json) {

    	if (json && Array.isArray(json.columns))
    	{
    		json.columns.forEach(function(column) {
    			this.addColumn(column);
    		}, this);
    	}

    	if (json && Array.isArray(json.items))
    	{
    		json.items.forEach(function(item) {
    			this.addItem(item);
    		}, this);
    	}
	}

    draw() {
        //Контейнер канбана
        if (!this.layout.kanban) {
        this.layout.kanban = document.createElement("div");
        this.layout.kanban.className = "kanban-container";
        this.layout.container.appendChild(this.layout.kanban);

        }

        //Обнулить контейнер канбана
        BX.cleanNode(this.layout.kanban);

        for (let columnId in this.columns)
        {
            var column = this.columns[columnId];
            this.layout.kanban.appendChild(column.render());
        }

    }

    moveItem(sourceItemId, futureColumnId, beforeItemId = null) {
        let futureColumn = this.columns[futureColumnId];
        let sourceItem = this.items[sourceItemId];

        this.columns[sourceItem.columnId].removeItem(sourceItem);
        futureColumn.addItem(sourceItem, beforeItemId);

        this.columns[sourceItem.columnId].render();
        futureColumn.render();

    	this.trigger('move', {
/*    		sourceItem,
    		column,
			targetItem*/
		});
}

    addColumn(column) {
    	column = new KanbanColumn(column, this.layout.container);
    	this.columns[column.getId()] = column;

        if (this.layout.kanban)
        {
            this.draw();
        }
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
    	this.items[item.getId()] = item;

    	var currentColumn = this.getColumn(item.columnId);
    	if (!currentColumn) {
	    	return null;
	    };
    	currentColumn.addItem(item);

        if (this.layout.kanban) {
            this.draw();
        }
    }

    removeItem(item) {
    	delete this.items[item.getId()];
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

        this.layout = {
            container: null,
            titleWrapper: null,
            title: null,
            textBox: null,
            button: null,
            input: null,
            price: null
        };

    };

    //Установка обработчиков событий
	initEvents() {
		this.layout.container.addEventListener('click', this.onCLick.bind(this));
	}

    getId() {
    	return this.id;
    }

    addItem(item, beforeItemId) {

		if (!(item instanceof KanbanItem))
		{
			return;
		}

    	if (!beforeItemId)
    	{

    		this.items.push(item);
    	}
    	else
    	{
    		let beforeItemIndex = -1;
    		for (let i = 0; i < this.items.length; i++)
    		{
    			if (this.items[i].id === beforeItemId)
    			{
    				beforeItemIndex = i;
    				break;
    			}
    		}

    		if (beforeItemIndex >= 0)
    		{
    			this.items.splice(beforeItemIndex, 0, item);
    		}
    		else
    		{
    			this.items.push(item);
    		}

    	}

    }

    //удаление item
	removeItem (removedItem) {
        this.items = this.items.filter((item) => {
            return item.id !== removedItem.id;
        });
	}

    render() {

        if (!this.layout.container)
        {
            this.layout.container = document.createElement("div");
            this.layout.container.className = "kanban-column";

            this.layout.titleWrapper = document.createElement("div");
            this.layout.titleWrapper.className = "kanban-column-title-wrapper";
            this.layout.container.appendChild(this.layout.titleWrapper);

            this.layout.title = document.createElement("div");
            this.layout.title.className = "kanban-column-title";
            this.layout.titleWrapper.appendChild(this.layout.title);

            this.layout.textBox = document.createElement("div");
            this.layout.textBox.className = "kanban-column-title-textBox";
            this.layout.titleWrapper.appendChild(this.layout.textBox);

            this.layout.input = document.createElement("input");
            this.layout.input.className = "kanban-column-title-input";
            this.layout.input.setAttribute("type", "text");
            this.layout.input.setAttribute("name", "new_title");
            this.layout.textBox.appendChild(this.layout.input);

            this.layout.button = document.createElement("button");
            this.layout.button.className = "kanban-column-title-button";
            this.layout.button.textContent = "Ок";
            this.layout.textBox.appendChild(this.layout.button);

            this.layout.price = document.createElement("div");
            this.layout.price.className = "kanban-column-price";
            this.layout.container.appendChild(this.layout.price);
            this.initEvents();
        }

        this.layout.title.textContent = this.name;
        this.layout.price.textContent = this.getTotalPrice();

        this.items.forEach(function(item) {
            this.layout.container.appendChild(item.render());
        }, this);

        return this.layout.container;
    }

    getTotalPrice() {
        let total = 0;
        this.items.forEach(function(item) {
            total += item.getPrice();
        }, this);

        return total;
    }

	onCLick(event) {
        var target = event.target;
		if(target.classList.contains('kanban-column-title')) {
			target.parentNode.classList.toggle('kanban-column-title-wrapper-editable');
            console.log(target);
            target.nextElementSibling.childNodes[0].focus();
		};

		if(target.classList.contains('kanban-column-title-button')) {
			var name = target.previousElementSibling.value;
			this.setName(name);
			target.parentNode.parentNode.classList.toggle('kanban-column-title-wrapper-editable');
		};
	}

	setName(name) {
		this.name = name;
		this.layout.title.innerHTML = name;
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
        	container: null,
            name: null,
            price: null,
            author: null,
            authorLink: null,
            date: null
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
            name: "Поменить наполнитель в лотке у кота",
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



