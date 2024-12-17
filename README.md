# HR Application

## Features

-   Options to **update, remove or add employees**
-   Options to filter employees based on **department or location**
-   Option to promote one member of each department to teamleader

## Technologies Used

Framework: React

-   Frontend packages:
    -   axios
-   Backend packages:
    -   express
    -   cors

## Preview App

[Live Page](https://staffoverflow.netlify.app/)

## What I've practiced and learnt

### Mapping, and when to return

```js
{
    employees.map((employee) => {
        return (
            <div>
                <p>{employee.fullName}</p>
            </div>
        );
    });
}
```

Alternatively:

```js
{
    employees.map((employee) => (
        <div>
            <p>{employee.fullName}</p>
            <p>{employee.department}</p>
        </div>
    ));
}
```

If **only one element** is returned it is fine to exclude the return keyword.

### useState with objects

Althought somewhat familiar with it, this project really helped me practice the concept of using state with objects

#### Initial object value

```js
const [person, setPerson] = useState({
    name: 'John Doe',
    age: 25,
    isStudent: true,
});
```

#### Updating properties

```js
function handleChange(e) {
    const { value, name } = e.target;
    setPerson({ ...prev, [name]: value });
}
```

I've learnt to use destructuring with e.target for more readable code.  
Also, that you do not need to explicitly pass the event object anymore.

### Using conditions with props

```js
<Button
    role='secondary'
    text={edit ? 'Save' : 'Edit'}
    handleClick={() => setEdit((prev) => !prev)}
/>
```

I didn't realise until I really looked at it but here **we pass a prop depending on a condition**. I knew it was possible using i.e. className but I never really saw the nuance of it. And I figured we could do that with other types of data other than string, which turned out to be true.

When validating an updated employee I added two different functions:

```js
<Button
    role='secondary'
    text={edit ? 'Save' : 'Edit'}
    handleClick={edit ? handleUpdateEmployee : () => setEdit((prev) => !prev)}
/>
```

If the user is editing, we handle the data the user has passed. If not, we set editing to true to enable editing mode.

### Passing data through navigate

```js
//Login.jsx

<Button
    text='Login'
    handleClick={() => navigate('/home', { state: user.username })}
/>
```

```js
// Menu.jsx
import { useLocation } from 'react-router-dom';

function Menu() {
    const location = useLocation();
    const [username, setUsername] = useState(location.state);
}
```

Because I wanted to pass the username from my Login component to my Menu component, I had to research a little.  
Navigate takes an **optional 'options' object** as a parameter. This object can store multiple optional properties, one of these being `state`  
**State** can be of type **any**

I've used the state property to pass error data in my try/catch blocks.  
However it's important to use an effect upon mount otherwise the app will crash because <q>Location state is null</q>.

```js
useEffect(() => {
    if (location.state) {
        setErrorInfo({
            status: location.state.status,
            message: location.state.message,
        });
    } else {
        setErrorInfo({
            status: 404,
            message: 'Page not found',
        });
    }
}, []);
```

### useRef hook

I by no means fully understand the useRef hook, but I found myself using when I implemented pagination into my app.

In EmployeeList.jsx

```js
const totalPages = useRef(0);
```

I initially set the totalPages to zero.
Later, I use a function I created to calculate how many pages will be needed based on how many total employees or filtered employees there are.

```js
totalPages.current = responseData.pages;
```

### Deployment

Actually deploying the app was both challenging and rewarding.  
I ended up deploying my API to **render** and my frontend to **netlify**

I will be completely honest, I had no faith that I would be able to deploy this app fully functionally.

My first roadblock was after deploying my json-server, it would not return the data along with the 'pages' object as it had done in development.  
I wasn't able to find out why this was, and instead re-did the whole API using express.

And I'm glad I did. I learnt quite a few things about express in the process.
For example, I had no idea that you **need** a bodyparser to parse body data otherwise it returns `undefined` by default.

```js
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

The backend is by no means optimal, beautiful or very clever but I am happy that it works and it taught me a lot.  
I do think the next time I make a backend from scratch things will be more clear and I will be able to plan it out a bit better.
