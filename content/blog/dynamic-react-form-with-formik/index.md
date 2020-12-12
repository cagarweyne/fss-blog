---
title: Dynamic React Form with Formik 
date: "2018-11-27"
description: How to create dynamic form in React
---

React has certainly made Front End development a whole lot more pleasant and has simplified a lot of complex things. Even though React makes developing client side a whole lot easier than before, creating robust forms that stand up to the needs of modern apps can be really difficult and complex. 

Creating forms in React is actually pretty simple, where the pain points arise is when you need to have validation, error messages and you need to have more than one form. Using just the simple controlled form components quickly becomes verbose, repetitive and very cumbersome. In general, creating forms with React can be quite challenging! 

There are some really good libraries out there which try to make handling forms a whole lot easier like Redux-form. While this library certainly has its uses, it would be an overkill for simple apps and running each form change through the redux store can really impact performance as your app scales.

There is one React form libary that is fast becoming the standard for React forms and one that has a bright future in the React ecosystem. In fact, it is recommended on the React forms page right at the bottom of the page, and it's called Formik. 

Formik is a set of React components that utilizes the React render method concept. Formik's motto is: "React forms without the tears!" And I'm sure after discovering Formik you will not have any tears when it comes to forms in React! 

What I really love about Formik is that it is just a React component and nothing else. So, it doesn't use any fancy or complex framework 
internally and it's footprint is really small, which means that it won't bloat your codebase. One of the creators of Formik Jared Palmer did an excellent talk recently on Formik and how it came about. 

In the talk he demonstrated how Formik works by building a mini version. I highly recommend that you watch his talk [here](https://www.youtube.com/watch?v=oiNtnehlaTo). In the next part we will go through how to create a mini formik component to better understand how we can abstract out the mundane tasks of handling forms in React in an elegant way using only React. 

## MiniFormik

Let's now create a mini version of Formik so that we can better understand how it works under the hood. Jared did a great job in explaining how the first version of Formik was created in his talk in Alicante, Spain, and this explanation is based on that React talk.

When creating forms in React we typically make use of a few things, React state, a handleChange function and a handleSubmit function that is called when we want to submit the form. We will take the official React docs form example for handling multiple inputs (https://reactjs.org/docs/forms.html), the example uses a reservation component: 

``` javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
This is a simple form component that uses the computed property value syntax to update the state, so instead of having multiple change handlers, we can use just use one handler and let it choose what to do based on the value of `event.target.value`. 

In the reservation example above, we have two inputs with the names `isGoing` and `numberOfGuests` - then in the state we initialize the same values `isGoing: true, numberOfGuests: 2`. 

So, when the handleChange is called we pull off the name part of event object and set the key as the name and the value from the event object. This is handy and allows us to use just the one function to handle multiple 
change events.

![7_dynamic_form-1](/images/image-1.png)

This is a simple form where there is only two inputs, without validation and error messages. You can see that we have had to write quite a lot of boilerplate code and if we were to add validation and error messages into the mix then things can get quite messy very quickly. 

Let's now abstract out the state and the handleChange function into a separate component and then expose state and the handle change to the reservation component via props. For this we will make use of the render props pattern, if you are not familiar with this concept then I highly recommend you read Michael Jackson's user a render tutorial [here](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

Let's now extract out the state and the handleChange function from the reservation component and create a new component called 
MiniFormik:

```javascript
class MiniFormik extends React.Component {
  state = {
    isGoing: true,
    numberOfGuests: 2
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    event.persist()
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
    }));
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
    });
  }
}
```

We've simply extracted out the state and the handleChange function from the reservation component. You will notice that we are using the
`event.persist()` function and this to let us target the correct event data since setState is Asynchronous. 

In the render method we are returning the children that are passed in and calling it with the state and the handleChange callback function. Let's now refactor the reservation component to make use of this MiniFormik render prop component: 

```javascript
class Reservation extends React.Component {
  render() {
    return (
      <MiniFormik>
        {
          (props) => {
            const {isGoing, numberOfGuests, handleChange} = props;
            return (
            <form onSubmit={handleSubmit}>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={numberOfGuests}
                  onChange={handleChange} />
              </label>
              <button type='submit'>Submit</button>
            </form>
          )}
        }
      </MiniFormik>
      )
  }
}
```
The form works exactly as before, only this time we have extracted out the handleChange and the state values into a separate component, for us to now make this form reusable on any type of data we need to make a few changes, in particular the values that we want to initialize the form with and pass in our own handleSubmit function that will be called once the submit button is clicked. Let's make those changes now to our MiniFormik component:

```javascript
class MiniFormik extends React.Component {
  state = {
    values: this.props.initialValues || {},
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    event.persist()
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
    }));
  };
  
  handleSubit = e => {
    e.preventDefault();
    
    //call the onSubmit handler passed in as a prop with the values
    this.props.onSubmit(this.state.values);
    
  }

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
    });
  }
}
```
We can now initialize the form with our own values by passing an `initialValues` prop and we can also pass our own onSubmit function that will be called with the form values once the submit button is clicked. Let's see how this works with our reservation component:

```javascript
class Reservation extends React.Component {
  render() {
    return (
      <MiniFormik
        initialValues={{
          isGoing: true, 
          numberOfGuests: 2
        }}
        onSubmit={v => console.log(v)}>
        {
          (props) => {
            const {values, handleChange} = props;
            return (
            <form onSubmit={handleSubmit}>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange} />
              </label>
              <button type='submit'>Submit</button>
            </form>
          )}
        }
      </MiniFormik>
      )
  }
}
```
Now we don't have hardcoded state values inside the MiniFormik component, we simply pass in the initial values ourselves then pull off the values object from the props and update the values for the input by preceding it with `values`. We also
pass in the onSubmit prop that will be called once the form is submitted. 

So we can actually now reuse this form as much as we want without having to duplicate the logic of keeping the form state and and the handleChange function in another component that needs to capture data. 

We can go further, let's say that we want add a handle blur function that will be called when any of the fields are visited by the user. We can do this easily by adding a handleBlur function to the MiniFormik component and then passing this down:

```javascript
class MiniFormik extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    event.persist()
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
    }));
  };
  
    handleBlur = (event) => {
      const name = event.target.name;
      event.persist()
      this.setState(prevState => ({
        touched: {
          ...prevState.touched,
          [name]: true
        },
      }));
    };
  
  handleSubit = e => {
    e.preventDefault();
    
    //call the onSubmit handler passed in as a prop with the values
    this.props.onSubmit(this.state.values);
    
  }

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
    });
  }
}
```
To add a handleBlur function, we have simply refactored our handleChange function to update the state whenever the user touches any of the fields. So, it updates the touced object with field that is visited by the user by adding that fields name as the key into the object and setting its value to true to signify that this field has been touched by the user. 

We then pass the handlBlur function down to the child component in the render. This lets us use the handleBlur function inside our Reservation component by pulling it off the props object:

```javascript
class Reservation extends React.Component {
  render() {
    return (
      <MiniFormik
        initialValues={
        {
          isGoing: true, 
          numberOfGuests: 2
        }
      }
        onSubmit={v => console.log(v)}
      >
        {
          (props) => {
            const {values, handleChange, handleBlur} = props;
            return (
            <form onSubmit={handleSubmit}>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange} 
                  onBlur={handleBlur} />
              </label>
              <button type='submit'>Submit</button>
            </form>
          )}
        }
      </MiniFormik>
      )
  }
}
```
As you can see we can extend the MiniFormik form as we want, we can also add an errors object into our state and then run validations against the values that are entered by the user, and whenever there is invalid input we simply update the errors object with the name of the field that has the error. This allows us to use the errors object to give validation messages to the user. 

You can now see that we have been able to create a render prop component that will handle all of the form aspect of our react app. This was a simple demonstration of how the Formik component abstracts away the mundane tasks of forms in React and it doesn't actually use any fancy algorithms or complex libraries - it's just React. 

However, Formik covers a lot of different edge cases and is more robust than our simple example here. Now that we have a better understanding of how Formik works, let's actually use Formik to see how easy it is to create forms in React.

## Formik

There are a few different components that you can use to handle forms with Formik, the first one that we will examine is the Formik component. This is a component that uses the render props pattern, and it is the full version of the MiniFormik that we created, only this time it comes with the ability to do lots more! 

Formik gives you many tools and options to render a form. When using the Formik
render prop component you can render a form with it in three differeny ways: 

1. Passing a component to the component prop of Formik
2. Using the render method and passing your forms markup in JSX 
3. Wrap your form with Formik and add your form as JSX 

### Using a component 

We will look at the three ways in more detail starting with the first method: passing a component to Formik via its component prop. We'll use the component example given in the docs: 

```javascript
const ContactForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.name}
      name="name"
    />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>
  </form>
};
``` 

A simple form component that has a single input field, it gets the values, errors, submit, blur and change functions via its props that must be passed down. Next we will simply pass the ContacForm component as the value to the component prop on Formik and it will inject the required props: 

```javascript
<Formik component={ContactForm} />;
```

### Using the render method

The second way that you can render a form with Formik is using the render pattern, and this is similar to the previous method, but this allows you to use the render prop of Formik and pass it your form's raw JSX markup or a component that you have imported: 

```javascript
<Formik render={props => <ContactForm {...props} />} />

<Formik
  render={({ handleSubmit, handleChange, handleBlur, values, errors }) => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name &&
        <div>
          {errors.name}
        </div>}
      <button type="submit">Submit</button>
    </form>
  )}
/>
```
### Render as children 

Finally, you can render your form as children of the Formik component, this is similar to our MiniFormik implementation that we created earlier: 

```javascript
<Formik>
  {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name &&
        <div>
          {errors.name}
        </div>}
      <button type="submit">Submit</button>
    </form>
  )}
</Formik>
```

Note you can also use the children prop and pass it your forms raw markup: 

```javascript
<Formik children={props => <ContactForm {...props} />} />
```

So as you can see it's pretty simple to render a form with Formik, in fact the steps are very similar to how you would create a form just using React - but the beauty of it is that the form is in React only and there is no other library that is being used under the hood. 

These examples are very simple and are only scratching the surface, but where Formik really earns its stars is in the props that are made available to you and how you can use them to create all sorts of different and complex forms. Let's dig in and explore the props that are made available to use and see how we can create a dynamic form with Formik.

## Formik use case - Dynamic Form with validation

Let's say that we need a flexible form that will be able to render different form fields depending on the given number of fields that are specified. This is a typical requirement for forms that need to cater to different geographical locations. For example, in one country you will need to collect a tax number and in another country this is not required. 

Sure, you could just create different templates for each country, but this can become quite repetitive and you will find that there is a lot of copying and pasting and duplicate functionality and this goes against the principle of
DRY. 

Creating a template is perfectly fine when you have, say half dozen different locale that you are targeting, but when you are targeting large geographical regions then using a dynamic form is the best option. 

Here is the link to the completed DynamicForm github repo that we will be building: [DynamicForm](https://github.com/cagarweyne/DynamicForm) 

Formik has quite a few options out of the box that cater to different requirements, we will use Formik to create our own custom dynamic form. I've used the create-react-app tool to get a started, we'll obviously need formik and we're also going to install yup, which we'll use for validating the inputs: 

```javascript 
yarn add formik yup
```

This will add the dependencies that we'll need. We're going to first clear out some of the create react app boilerplate code and then create a DynamicForm component. Inside this component we will create a simple input using Formik to get started: 

 
```javascript
//DynamicForm.jsx

import React, { Component, Fragment } from 'react';
import { Formik, Field } from 'formik';
import './App.css';

class DynamicForm extends Component {

  renderFields(inputs) {
    return inputs.map(input => {
      return (
        <div key={input.name}>
          <label>{input.label}</label>
          <div>
            <Field
              name={input.name}
              render={(props) => {
                const { field } = props;
                return (
                  <input
                    {...field}
                    type='text'
                  />
                );
              }}
            />
          </div>
        </div>
      );
    })
  }

  getInitialValues(inputs) {
    //declare an empty initialValues object
    const initialValues = {};
    //loop loop over fields array
    //if prop does not exit in the initialValues object,
    // pluck off the name and value props and add it to the initialValues object;
    inputs.forEach(field => {
      if(!initialValues[field.name]) {
        initialValues[field.name] = field.value;
      }
    });

    //return initialValues object
    return initialValues;
  }

  render() {
    const initialValues = this.getInitialValues(this.props.fields);
    return (
      <div className="app">
        <h1>Dynamic International Form</h1>
        <Formik
          onSubmit={(values) => {console.log(values)}}
          validationSchema={this.props.validation}
          initialValues={initialValues}
          render={(form) => {
            return <div>
              <form onSubmit={form.handleSubmit}>
                {this.renderFields(this.props.fields)}
                <button type='submit' className='btn'>Submit</button>
              </form>
            </div>
          }}
        />
      </div>
    );
  }
}

export default DynamicForm;

//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
});

export default validation;

//App.jsx

import React, { Component } from 'react';
import validation from './validation';
import DynamicForm from './DynamicForm';

class App extends Component {
  render() {
    const fields = [
      {label: 'First Name', type: 'input', name: 'companyName', value: 'FSS'},
    ];
    return (
      <DynamicForm fields={fields} validation={validation} />
    );
  }
}

export default App;

```

This is what is rendered to the page: 

![1_dynamic_form](/images/image-2.png)

We have a single input field with a submit button, there is a bunch of css styles inside the App.css file to give the form 
some simple styling. 

Let's go through the code inside DynamicForm component quickly to understand exactly what is happening. First of we're using the Formik component from Formik and we are using its render function to create a single input. We have passed the onSubmit prop a function that will get called with the form values once they all pass validation. 

This function simply logs out the values to console - you would typically pass a function that will post this data to a server somewhere. Notice we are using the `validationSchema` prop here as well, this is optional and has been built into Formik. 

We could have used our own validation function, but the Yup schema that it returns a is very useful, as all we need to do is define our values and their types. You can read more about Yup schema here on their github [page](https://github.com/jquense/yup)

We also have the `initialValues` prop, here we have to initialize the initial values of the form, even if the form is empty otherwise React will throw an error. The `initialValues` prop must be an object whose key will be used as the name and the value will be the initial value of the input. In our single input example we have passed in: 

```javascript
{
  firstName: 'Abdi'
}
```   

This was derived with our function `getInitialValues` which plucks off the name value and uses that as a key and then assigns the value from the object that is passed in as part of an array of objects in the fields prop. We also have a another helper method `renderFeilds` this method simply maps over the given fields and returns a `Field` component. 

There are few ways that we can render with the Field component and here we are passing markup that we want rendered by using the `Field`s render prop. The render prop simply returns some jsx that we pass to it. 

Here we also get access to this particular field's value, name, onChange, and OnBlur functions via the `field` key. As you can see we are destructuring that from the `props` parameter and passing these to the input that we return from the `Field` component. So this: 

```javascript
<input
  {...field}
  type='text'
/>
```
Is Equivalent to: 

```javascript
<input
  name={field.name}
  value={field.value}
  onChange={field.Onchange}
  onBlur={field.onBlur}
  type='text'
/>
```

The first way just condenses our code and makes it more terse. Inside the `renderFields` method we are also using the label prop from the fields object that we passed in. 

The last part of the jigsaw is the validation file, we are making use of the built in support for Yup schema in Formik and we are passing in our own yup schema that will be used to validate each field value.

Inside the validation file we create a new Yup schema and define each fields type using the many different functions that are made available by Yup to validate each field. 

It is important to understand here that the name of each schema must match
the name of each value that we initialize in the Formik component. 

This means that the names that we use in initialValues must match the names that we declare inside the validation file. So, in our case here we have a single initial value called `firstName` and inside our validation file we also have a `firstName` key of the Yup schema. 

This is very important, otherwise formik will not know which validation rule to apply against which input value. 

Inside our validation file we are simply going to validate the input to this field by running `matches()` function that will return either true or false based on the criteria that we wish to match: 

```javascript
const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
});
```
In our example here we are checking to make sure that the entered values are alphabet characters only for the first name, and we are using the `required` method to make this a required field that cannot be empty. 

We are also specifying a maximum of 35 characters as input. So, let's switch our focus back to the Formik component:

```javascript
        <Formik
          onSubmit={(values) => {console.log(values)}}
          validationSchema={this.props.validation}
          initialValues={initialValues}
          render={(form) => {
            return <div>
              <form onSubmit={form.handleSubmit}>
                {this.renderFields(this.props.fields)}
                <button type='submit' className='btn'>Submit</button>
              </form>
            </div>
          }}
        />
```

The line `<form onSubmit={form.handleSubmit}>` calls our onSubmit function that we supplied as a prop to `onSubmit`, our function only gets called after validation has been run and all of the field values have passed this validation.

Formik will not call the onSubmit function unless this validation is successful. Finally we have a button with a type submit that we can use to submit our form data. 

So far this is really simple stuff, however we have created a powerful foundation that will enable us to reuse this form in so many ways. We are currently dynamically rendering each field component as it is passed in, and we are applying validation on the fly as the values change. 

This is the default behavior and we can change this using the `validateOnChange` prop and set that to false if we do not want to validate on changes. 

We can add as many input fields as we need, let's add a few more fields to our component by simply adding more field objects to the fields array that we pass to DynamicForm as a prop: 

```javascript
const fields = [
      {label: 'First Name', type: 'input', name: 'firstName', value: 'Abdi'},
      {label: 'Last Name', type: 'input', name: 'lastName', value: 'Ahmed'},
      {label: 'Address', type: 'input', name: 'address', value: '10 FSS Street'},
      {label: 'City', type: 'input', name: 'city', value: 'London'},
    ];
```

We have expanded the number of fields that we want to render and if you save and view the browser you wil now see that we have an additional four fields that have been rendered. 

This is pretty cool, because it means that we don't have to write the markup for each additional field and likewise if we want to remove a field all we have to do is delete it the object that corresponds to that field. 

It's also worth noting that since we are using Yup validation, we need to also add a validation rule for each new additional field that we add to our form inside our validation file: 

```javascript
const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
  lastName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
  address: Yup.string()
    .required(),
  city: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
});
```
We now have validation for each field that we are rendering with DynamicForm, now if we want to remove a particular field from our form we need to now make sure that we delete not only that particular fields object in the fields array, but also the corresponding validation key inside the validation file. 

If we don't delete this field from the validation file and we only delete it from the fields object and that field is required, Formik will not submit the form since there isn't a value for that deleted field being passed to the validation file. This is why we need to make sure that the validation file keys not only match by the names of the values but also make sure that the values are the same in Formik and the Yup schema. 

We can also change the ordering of the fields as we wish as well, so, say we wanted to have city come before the address field we
can easily do this easily by simply changing the ordering inside our fields array that we pass as a prop: 

```javascript
const fields = [
      {label: 'First Name', type: 'input', name: 'firstName', value: 'Abdi'},
      {label: 'Last Name', type: 'input', name: 'lastName', value: 'Ahmed'},
      {label: 'City', type: 'input', name: 'city', value: 'London'},
      {label: 'Address', type: 'input', name: 'address', value: '10 FSS Street'},
    ];
```

Now if we save this change and view the browser, you will now see that the city field comes before the address input: 

![2_dynamic_form](/images/image-3.png)

We now have a flexible form that we can add, remove and order as we need, however, our form currently only has input fields of text and say we wanted to add a drop down option, or we wanted the user to be abe to send a message in a text area or maybe we need to also have a checkbox? We can further extend our dynamic form by adding these different types of input. 

## Add more input types to our dynamic form

In our `renderFields` method we can do a check on the `type` key of each form field that is passed in as a prop. Currently, all of our form fields are just text inputs. 

Let's add a check to see if the type is select and if this is the case then we want to render a dropdown element. We will delegate this to another class method and let's call this `renderSelect`: 

```javascript
  renderSelect(input) {
    return (
      <Fragment key={input.name}>
        <label>{input.label}</label>
        <div>
          <Field
            name={input.name}
            render={(props) => {
              const { field } = props;
              const defaultOption = <option key='default' value='Please Select'>Please Select</option>;
              const options = input.data.map(i => <option key={i} value={i}> {i} </option> );
              const selectOptions = [defaultOption, ...options];
              return (
                <div className='dropdown'>
                  <select value={field.value} {...field}>
                    {
                      selectOptions
                    }
                  </select>
                </div>
              );
            }}
          />
        </div>
      </Fragment>
    );
  }
```

The `renderSelect` method will take the input object and return a select element. For this we have made use of the Field component's render prop and like before we get access to the field object via the props that are passed as a parameter to the render prop function. 

In the render prop function we create a default option with a value of 'Please Select' and we use this as a default option. Notice we are expecting a data key to be available on the input object that is passed to `renderSelect`, this data key will be an array that contains each option that we want to render. 

We map over this data array to return an array of jsx `<option>` elements. We then concatenate the default option with the rest of the options into another array and use that as the select options. 

We need to now add a check inside of the `renderFields` method to check for the existence of a select input field in the fields
prop that is passed in: 

```javascript
renderFields(inputs) {
    return inputs.map(input => {
      if(input.type === 'select') {
        return this.renderSelect(input);
      }
  //rest of code.....    
```

Now all that's left to do is to actually add the select field's data into our fields prop as an object: 

```javascript
const fields = [
      {label: 'First Name', type: 'input', name: 'firstName', value: 'Abdi'},
      {label: 'Last Name', type: 'input', name: 'lastName', value: 'Ahmed'},
      {label: 'City', type: 'input', name: 'city', value: 'London'},
      {label: 'Address', type: 'input', name: 'address', value: '10 FSS Street'},
      {label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Please Select'},
    ];
```
Notice that we have an extra key for the select input type; data, this is list of the options that we want to use for the drop down list. As for the initial value we are setting this to `Please Select` so that is selected as the default option. 

Next, we need to add this field to the validation file. We will make this a required field and use a test function to make sure that the default value is not selected. So our updated validation file should look like this: 

```javascript
const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
  lastName: Yup.string()
    .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
    .required()
    .max(35),
  address: Yup.string()
    .required(),
  city: Yup.string()
    .matches(alpha, {message: "Enter Valid city", excludeEmptyString: true })
    .required(),
  occupation: Yup.string()
    .test('county', 'cannot be empty', value => value !== 'Please Select')
    .required('required'),
});
```

If we now save our files, we should see our newly added select input with the specified options on the page and we can use the drop down to make a selection: 

![3_dynamic_form](/images/image-4.png)

You will notice that if we don't make a selection or we enter invalid data and press the submit button nothing happens on the page. This is because there errors on form when we run the validation against it. We need to be able to show these errors to the user and highlight the fields that the user needs to correct.

## Show validation errors 

Formik provides a host of props, and one of the most useful ones are the `errors`, `touched` and `isValid`. Inside our render prop methods we get access to what's called the 'formikBag'. This is an object of the entire forms values, touched, errors and a whole host of props. 

In order to show the user validation errors, we will use the errors and touched props. We can also use the `isaValid` prop to enable and disable the submit button but will suffice with the highlighting the fields that have invalid input. 

The errors and touched props are an object with the name of each field as key. When there is an error the errors object will contain the name of the field as the key, likewise the touched object will also have the names as keys with the value as `true` to show that particular field has been visited by the user. 

We will pull off the errors and touched object from the `props` parameter that is passed to the render prop and use these to conditionally apply an ID to each form field: 

```javascript
  renderFields(inputs) {
    return inputs.map(input => {
      if(input.type === 'select') {
        return this.renderSelect(input);
      }
      return (
        <div key={input.name}>
          <label>{input.label}</label>
          <div>
            <Field
              name={input.name}
              render={(props) => {
                const { field } = props;
                const { errors, touched } = props.form;
                const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
                return (
                  <input
                    {...field}
                    id={hasError}
                    type='text'
                  />
                );
              }}
            />
          </div>
        </div>
      );
    })
  }
```
We check to see the errors and the touched object and if these are both present for each input field then we return the string 'hasError' as the ID value. We then add this as an ID value to the input element. 

The errors and touched object values get updated for each onChange event, so this means that whenever the field is touched and there is an error on that field the value for the ID will contain 'hasError' and will apply the error validation css to that field. Here is the updated `renderSelect` method:

```javascript
  renderSelect(input) {
    return (
      <Fragment key={input.name}>
        <label>{input.label}</label>
        <div>
          <Field
            name={input.name}
            render={(props) => {
              const { field } = props;
              const { errors, touched } = props.form;
              const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
              const defaultOption = <option key='default' value='Please Select'>Please Select</option>;
              const options = input.data.map(i => <option key={i} value={i}> {i} </option> );
              const selectOptions = [defaultOption, ...options];
              return (
                <div className='dropdown'>
                  <select value={field.value} {...field} id={hasError}>
                    {
                      selectOptions
                    }
                  </select>
                </div>
              );
            }}
          />
        </div>
      </Fragment>
    );
  }
```

![4_dynamic_form](/images/image-5.png)

We can also add a small alert banner that will be shown along with highlighted fields with errors. Note you can use the errors object to tell the user exactly which field needs to be corrected, but since we are highlight these we can suffice with a simple message to tell the user that there are errors that need to be corrected. 

So, inside the render method of the DynamicForm component we can add this simple error banner that will show whenever there is at least 
one error in the form:

```javascript
render() {
    const initialValues = this.getInitialValues(this.props.fields);
    return (
      <div className="app">
        <h1>Dynamic Form</h1>
        <Formik
          onSubmit={(values) => {console.log(values)}}
          validationSchema={this.props.validation}
          initialValues={initialValues}
          render={(form) => {
            const errorMessageShow = Object.keys(form.errors).length > 0 ? 'error' : 'hidden';
            return <div>
              <form onSubmit={form.handleSubmit}>
                <div className={errorMessageShow}>
                  Please correct the errors below
                </div>
                {this.renderFields(this.props.fields)}
                <button type='submit' className='btn'>Submit</button>
              </form>
            </div>
          }}
        />
      </div>
    );
  }
```
In the render prop function, we also get access to the `formikBag` this is all the props that are available to the form including errors and touched object. 

Here we test to the presence of at least one error and if that it is the case we assign the class `error` to the `errorMessageShow` variable, otherwise we set the class name to 'hidden'. We use the `errorMessageShow` as the value for the class on the error banner div. 

![5_dynamic_form](/images/image-6.png)

Remember, the error object is updated on every change, so this means that if the user corrects the errors in the form, the errors object will also be updated and will consequently be empty meaning that there is no error. 

This will result in an 'hidden' being assigned as the class value and the error banner will be hidden from view. 

We can further extend the form by adding in more form field types like text and checkboxes. For this we can add two more methods,
and you can guess what we'll call them!`renderCheckBox` and `renderTextArea`: 

```javascript
renderCheckBox(input) {
  return (
    <Fragment key={input.name}>
      <label>{input.label}</label>
      <Field
        name={input.name}
        render={(prop) => {
          const { field } = prop;
          return (
            <input
              name={input.name}
              type="checkbox"
              checked={field.value}
              onChange={field.onChange} />
          );
        }}
      />
    </Fragment>

  );
}

renderTextArea(input) {
  return (
    <Fragment key={input.name}>
      <label>{input.label}</label>
      <div>
        <Field
          name={input.name}
          render={(props) => {
            const { field } = props;
            const { errors, touched } = props.form;
            const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
            return (
              <div>
                  <textarea {...field} id={hasError}>
                  </textarea>
              </div>
            );
          }}
        />
      </div>
    </Fragment>
  );
}
``` 

Then inside the `renderFields` method's map function we will check the type key accordingly and call each method: 
```javascript
renderFields(inputs) {
    return inputs.map(input => {
      if(input.type === 'select') {
        return this.renderSelect(input);
      }

      if(input.type === 'checkbox') {
        return this.renderCheckBox(input);
      }

      if(input.type === 'textarea') {
        return this.renderTextArea(input);
      }
 //rest of code...     
```
As we did before, we will need to update the `fields` prop if we want to add a checkbox or a textarea and also add the required validation for each field respectively: 

```javascript
    //fields prop that will be passed to DynamicForm in App.js
    const fields = [
      {label: 'First Name', type: 'input', name: 'firstName', value: 'Abdi'},
      {label: 'Last Name', type: 'input', name: 'lastName', value: 'Ahmed'},
      {label: 'City', type: 'input', name: 'city', value: 'London'},
      {label: 'Address', type: 'input', name: 'address', value: '10 FSS Street'},
      {label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Please Select'},
      {label: 'Message', type: 'textarea', name: 'message', value: ''},
      {label: 'Agree to Terms & Conditions', type: 'checkbox', name: 'terms', value: false},
      ];

    //validation file 
    const validation = Yup.object().shape({
      firstName: Yup.string()
        .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
        .required()
        .max(35),
      lastName: Yup.string()
        .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
        .required()
        .max(35),
      address: Yup.string()
        .required(),
      city: Yup.string()
        .matches(alpha, {message: "Enter Valid city", excludeEmptyString: true })
        .required(),
      occupation: Yup.string()
        .test('county', 'cannot be empty', value => value !== 'Please Select')
        .required('required'),
      message: Yup.string()
        .required('required'),
      terms: Yup.string()
        .test('terms', 'you must agree to terms', value => value !== false)
        .required('required'),
    });
```

Now we have an updated form with a variety of form field inputs along with validation:

![6_dynamic_form](/images/image-7.png)

## Conclusion

Formik is a real gamer changer, and the great thing about it is that you do not have to learn a new or complex API to use it, since it's written in pure React. The great thing about that also is that as React is consistantly improving, so will your React forms and you can take advantage of new React functionality 
without worrying about breaking anything.  
