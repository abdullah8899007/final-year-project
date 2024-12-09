
export const  DEAL_ITEMS = [
    { id: 1, name: "Spicy Mozarella Barbeque", price: 10, description: "Spicy Barbeque Mozarella Noodles", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
];
 

export  const  DEAL_CATEGORIES  = [
    { categoryId: 1, name: "Noodles", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
    { categoryId: 2, name: "Pizza", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
    {categoryId: 3, name: "Burgers", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
    {categoryId: 4, name: "Salads", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
    { categoryId: 5, name: "Sandwiches", image: "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=1024x1024&w=is&k=20&c=MUzQiekBfW_aJnHk-Q0oGwyJyz6K1XUwq-_UZCf1tMM=" },
];

export const ORDER_DATA = [
    {
        id: 3451,
        customerId: 1,
        items:{
          itemId: 1,
        quantity: 2,
        },
        date: '24-5-2020',
        orderType: 'Lunch',
        total: 4534,
        Orderstatus:"on delivery",
      },
      {
        id: 3452,
        customerId: 2,
      items:{
        itemId: 102,
        quantity: 1,
      },
        date:"24-5-2020",
        orderType: 'Dinner',
        total: 4535,
        Orderstatus:"Delivered"
      },
      {
        id: 3453,
        customerId: 3,
        items:{
          itemId: 12,
        quantity: 4,
        },
        date:"24-5-2020",
        orderType: 'Dinner',
        total: 3453,
        Orderstatus:"delivered",
      },
];

export const CUSTOMER_INFO= [
    {
      id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: "456 Oak St 456 Oak St ",
    },

    { id: 2, name: "Jane Smith", address: "456 Oak St 456 Oak St", phone: "555555678", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", address: "789 Pine St 456 Oak St", phone: "55555559012", email: "bob@example.com" }
];


export const  INVOICE_INFO= [
  {
    id:451,
    orderId: 3451,
    date: '24-5-2020',
  },
  {
    id:452,
    orderId: 3452,
    date: '24-5-2020',
  },
  {
    id:453,
    orderId: 3453,
    date: '24-5-2020',
  },
  
];
