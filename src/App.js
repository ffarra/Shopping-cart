import './App.css';
import {AiOutlineLeft, AiOutlinePlus, AiOutlineRight} from "react-icons/ai";
import {useReducer} from "react";

const data = [
    {itemName: 'item 1', quantity: 1},
    {itemName: 'item 2', quantity: 1},
    {itemName: 'item 3', quantity: 1},
]

const initialState = {
    items: data,
    addItem: '',
    totalNumber: data.length,
}

const calculateTotalNumber = items => items.reduce((p, c) => p + c.quantity, 0)

function reducer(state, action) {
    switch (action.type) {
        case "ON_CHANGE":
            return { ...state, addItem: action.payload}

        case 'handleAddStuff': {
            const newState = {...state}
            if (newState.addItem === '') return state;

            const newItem = {
                itemName: newState.addItem,
                quantity: 1,
            };

            newState.items.push(newItem);
            newState.addItem = '';
            newState.totalNumber = calculateTotalNumber(newState.items)

            return newState;
        }

        case 'handleDecrease': {
            const newState = {...state};

            if (newState.items[action.payload].quantity === 1) return state;

            newState.items[action.payload].quantity--;
            newState.totalNumber = calculateTotalNumber(newState.items)

            return newState;
        }

        case 'handleIncrease': {
            const newState = {...state};
            newState.items[action.payload].quantity++;
            newState.totalNumber = calculateTotalNumber(newState.items)

            return newState;
        }

        default: {
            return state;
        }
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <div className='add-stuff'>
                <input placeholder='Add an item...' value={state.addItem} onChange={(e) => dispatch({type: "ON_CHANGE", payload: e.target.value})} />
                <AiOutlinePlus onClick={() => dispatch({type: 'handleAddStuff'})} size={27} color='#fd7163'/>
            </div>
            <ul>
                {
                    state.items.map((item, index) =>
                    (
                        <li key={index}>
                            {item.itemName}
                            <div className='quantity'>
                                <AiOutlineLeft onClick={() => dispatch({type: 'handleDecrease', payload: index})} size={27}/>
                                <span>{item.quantity}</span>
                                <AiOutlineRight onClick={() => dispatch({type: 'handleIncrease', payload: index})} size={27}/>
                            </div>
                        </li>
                    ))}
            </ul>
            <span className='total'>Total: {state.totalNumber}</span>
        </div>
    );
}

export default App;
