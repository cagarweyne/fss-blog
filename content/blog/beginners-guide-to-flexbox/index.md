---
title: Beginners Guide to Flexbox
date: "2020-05-21"
description: Complete guide to Flexbox
---

Flexbox is a new module in CSS3 that makes it easy to align elements in different directions and in different orders. Flexbox also allows you to change these alignments if necessary, this is really useful for responsove design. 

The main idea behind Flexbox is to give the container the ability to expand and to shrink elements to best use all the avaiable space. This means that Flexbox easily replaces float layouts with less and more logical and readable code. 

The flexible power that Flexbox brings in laying out content on the page means that it completely changes the way that we build layouts for good. In a nutshell, Flexbox makes developing responsive layouts a whole lot easier.

In terms of using and understanding Flexbox, there aren't that many concepts to understand and you will be able to start using Flexbox in your code really quickly. 

However, we do need to understand some basic Flexbox concepts starting with the what is called the flex container. To create a flex container all you have to do is to make the container, such as the div, a flex container. 

You can easily do this by setting the value for the display property to flex: `display: flex;` This sets the container to become a flex container and all of the items that are inside of the container become what are called flex items. The following diagram shows the container and the flex items in a visual way:

![figure1](/images/figure1.png)

The direction in which the flex items are laid out is called the Main Axis and the other direction is called the Cross Axis. The following diagram shows this:

![figure2](/images/figure2.png)

It’s important to understand the direction in which the items inside a flex container are laid out as we can change this direction in the CSS. We will explore this in more detail later on in the tutorial. 

## Flexbox properties 

The Flexbox specification defines properties that can be used on the flex container to position the flex items inside the container. There are some properties that can be used on the flex items themselves, and we’ll explore these later. 

### Flexbox properties for the container 

* flex
* flex-direction
* flex-wrap
* justify-content
* align-items

#### Flex 

Setting the display to flex will automatically align all the flex items in a row next to each other. By default the value for the direction will be set to row. We can change this by changing the flex-direction property value. 

#### Flex direction 

This property sets the direction of the flex items with the possible values: *row, row-reverse, column, column-reverse*. The flex-direction property specifies the direction of the Main Axis. The default value is the row. We will see each of these values and how they affect the direction of the items in the flex container.

#### Flex wrap 

With the possible values: *wrap, wrap-reverse, nowrap*. The default value for the flex-wrap property is nowrap. This property defines whether the items should wrap to a new line if there is no space available.

#### Justify Content 

This property has several possible values including: *flex-start, center, space-between, space-around, space-evenly*. This property defines how the browser distributes space between and around the flex items along the Main Axis.

#### Align Items

This is similar to the justify-content property but this property sets the alignment on the Cross Axis for the flex items. This property is used together with justify-content. This property has many possible values, and the default is normal. The justify-content and the align-items are one of the important properties in Flexbox that you will use a lot.

### Flexbox properties for the items

* align-self 
* order
* flex-grow
* flex-shrink
* flex-basis 

#### Align Self 

The align-self property aligns the item on the Cross Axis. It will override the flex items align-items property. 

#### Order 

This property takes an integer value. It defines how a flex item should be laid out in a flex container. This is useful for re-ordering items for smaller screens for example. 

#### Flex grow, Flex Shrink, Flex Basis  

The flex-grow property defines how much the item can grow in a flex container. The flex-shrink property has the opposite effect of flex-grow and defines how much a flex item should shrink. The flex-basis property is used to define the base width for the flex items. These three properties are typically used together when styling flex items in a container. 

We can use the shorthand version for the three values, and they can be shortened to just: flex: 0 1 auto for example. Next we’re going to have a look at these properties in more detail and it will be easier to understand with code and examples.  

## Practical Example 

We will now have a look at how Flexbox works with examples, starting with the container properties. 

### Container properties example

To follow along just create a simple flex container div with five items inside it like this: 

```html
<div class='wrapper'>
    <h1>Flexbox 101</h1>
    <div class='flex-container'>
      <div class='flex-item'>1</div>
      <div class='flex-item'>2</div>
      <div class='flex-item'>3</div>
      <div class='flex-item'>4</div>
      <div class='flex-item'>5</div>
    </div>
  </div>
```

I have applied to some basic styling to the page and the elements, here are the styles that I have added: 

```css
body {
  background-color: aquamarine;
  margin: 0;
  padding: 0;
}

.wrapper {
  background-color:aliceblue;
  width: 80%;
  height: 1300px;
  margin: 0 auto;
  max-width: 75%;
  padding: 20px;
}

h1 {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 50px;
}

.flex-container {

}

.flex-item {
  background-color: #e66060;
  margin: 30px;
  font-size: 30px;
  color: #fff;
  padding: 20px;
}
```

With the setup out of the way, our page should look like this: 

![figure3](/images/figure3.png)

In order for us to start using Flexbox, we need to first set the display value for the flex container element to be flex: 

```css
  display: flex;
}
```

Upon doing this we can immediately see that this has changed how the divs in our page are laid out:

![figure4](/images/figure4.png)

This has caused all of the divs to behave as if they are now inline, but this is how Flexbox lays the divs out. By default Flexbox lays them out in a direction that is a row, so simply applying `display: flex` means that we are also using the default value for the flex-direction with a  value set to row.

#### Flex Direction 

We can also control the direction of the flex items in our flex container, at the moment it is set to the default of `flex-direction: row`, if we add this to the flex container class:

```css
.flex-container {
  display: flex;
  flex-direction: row;
}
```

You will notice that nothing changes, we can change the value to move the items in the container. The available values are: row (default value), row-reverse, column, column-reverse.

Let’s have a look at each of these values in detail, we’ve already seen what happens when we use row as the value, now let’s look at row-reverse: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row-reverse;
}
```

![figure5](/images/figure5.png)

This sets the div items to align to the right and it also reverses the order, so now the div with number 1 is at the end and div number 5 is at the beginning. This reverse in the order is only done visually, if you inspect the code with the dev tool, you will notice that the HTML markup is exactly how we wrote it. What’s also worth noting is that Main Axis is now in the opposite direction, so this means that starting point is going from right to left. 

Flexbox was created to make laying items out on the page really simple, with column we can achieve how we had the divs initially without applying any Flexbox. So when we set the flex-direction: column, we get the following result:

![figure6](/images/figure6.png)

The divs are now stacked, this will be useful when we want to create responsive layout for smaller devices like phones and tablets. 

The column-reverse value will reverse the order and also change the main axis direction, so this means that the main axis will go from bottom to top. Let’s update the flex-container class and add the flex-direction: column-reverse: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: column-reverse;
}
```

So when we view the result you will notice that it has reversed the order and now it is going from bottom to top: 

![figure7](/images/figure7.png)

#### Flex Wrap

The next flex container property that we will look at is the flex-wrap. This property can take three possible values, these are: nowrap (default), wrap, wrap-reverse. 

The default value for the wrap property is nowrap. In the HTML markup we’re going to add more flex items to better see how the flex wrap property works. First make sure to set the flex-direction back to row, then we’re going to add 10 more flex items as divs in the html:

```html
<div class=’wrapper’>
    <h1>Flexbox 101</h1>
    <div class=’flex-container’>
      <div class=’flex-item’>1</div>
      <div class=’flex-item’>2</div>
      <div class=’flex-item’>3</div>
      <div class=’flex-item’>4</div>
      <div class=’flex-item’>5</div>
      <div class=’flex-item’>6</div>
      <div class=’flex-item’>7</div>
      <div class=’flex-item’>8</div>
      <div class=’flex-item’>9</div>
      <div class=’flex-item’>10</div>
      <div class=’flex-item’>11</div>
      <div class=’flex-item’>12</div>
      <div class=’flex-item’>13</div>
      <div class=’flex-item’>14</div>
      <div class=’flex-item’>15</div>
    </div>
  </div>
```

Now when we view the browser, you will notice that the extra flex items are overflowing the container: 

![figure8](/images/figure8.png)

If we add the flex-wrap property and set the value to nowrap, as this is the default behaviour we get the exact same result. To fix this issue of flex items overflowing we can set the value to wrap.

The wrap value will make sure to wrap the flex items that cannot fit inside the row top the next line. So in the CSS, set the `flex-wrap: wrap` in the flex-container class: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

This will force the extra flex items that cannot fit in the first row to wrap onto the next line:

![figure9](/images/figure9.png)

Next we’re going to have a look at the wrap-reverse value, and as you might expect this will wrap the extra flex items but reverse these. To see how this changes the set the wrap property to wrap reverse:

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}
```

This will also wrap the extra items onto a new line, however it takes the second row and puts that into the first line and then moves the first row on to the second row: 

![figure10](/images/figure10.png)

The flex-wrap property is useful for controlling extra flex items inside a flex container, whilst the wrap-reverse has its use cases, you will more than likely use the `flex-wrap: wrap` value to add overflowing flex items onto the next line.

#### Justify content 

The justify content property is one of the important Flexbox properties that you will use time and again when you are using Flexbox. The justify content property can take more than a dozen values, but we will look at the values that are used the most frequently. These include: 

1.	flex-start 
2.	flex-end
3.	center 
4.	space-between
5.	space-evenly
6.	space-around

##### Flex start 

This is the default value for the justify-content property, so if we set the `justify-property: flex-start`, the items will still be at their same position:

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
```

![figure4-1](/images/figure4-1.png)

##### Flex end 

To move the items to the right we can use the flex-end value:

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
```

This will move the flex items to right:

![figure11](/images/figure11.png)

The justify-content property is really useful, we can use this to align items anywhere along the Main Axis. You can also use this to align navigation items. We can also use the value center to align flex items right in the center of their container.

##### Center 

The value center will center align all of the flex items: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
```

![figure12](/images/figure12.png)

##### Space between

We can use the space-between value to create space between all of the flex items in the container:

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
```

This will create space between the flex items:

![figure13](/images/figure13.png)

We can also use a similar value space-evenly, which will create an even amount of space between the flex items. 

##### Space evenly 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
```

This is similar to the space-between value, but now the flex items have an even space between the flex items: 

![figure14](/images/figure14.png)

##### Space around

The space-around value will create space around the flex items in the container, so if we update the value for justify-content to space-between: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
```

This will add space around all of the flex items:

![figure15](/images/figure15.png)


#### Align items 

The align-items property sets the alignment of the cross axis in a Flexbox container, the cross axis, depending on the flex-direction, goes in a different direction to the main axis. So if we recall the image from earlier – if the  main axis goes from left to right, the cross axis will go vertically from top to bottom: 

![figure2-1](/images/figure17.png)

So in our page we have the flex direction set to flex-start, this means that the cross axis goes vertically from top to bottom. The align-items property accepts more than a dozen values, but once again we will look at the most frequently used values: 

1.	Stretch
2.	Center 
3.	Start 
4.	End 

##### Stretch 

The default value for the align-items property is stretch, to see how this works we'll need to set the height of the flex items to 500px:

```css
.flex-items {
    height: 500px;
    .......
}
```

Then add the property align-items: stretch to our flex container: 

```css
.flex-container {
  border: solid 3px black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
}
```

You will notice that the flex items stretch to occupy the available space, the space that is on the top and bottom is coming from the margin property that we set for each flex item:

![figure17](/images/figure18.png)

##### Center 

To see how the align-items: center works set the align-items: center: 

```css
.flex-container {
  border: solid 3px black;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
```

You will notice that the flex items are now center aligned in the cross axis, or in our case they are vertically center aligned within the flex container:

![figure16](/images/figure19.png)

##### Flex start

The flex-start value will set the alignment of the flex items to the beginning of the cross axis and in our case it will be at the top. So set the value for the align-items: flex-start: 

```css
.flex-container {
  border: solid 3px black;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}
```

![figure18](/images/figure20.png)

##### Flex end

The end value for the align-items property will move the flex items to the end of the cross axis. To see how this looks in our example, add align-items: flex-end: 

```css
.flex-container {
  border: solid 3px black;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
}
```

When you view in the browser, you will see that our flex items are now positioned at the bottom of the container:

![figure19](/images/figure21.png)

The align-items property is very useful and along with the justify-content property is frequently used. When we look at the flex items we will see that we can override the align-items setting for each individual flex item value using the align-self property.

### Flex items properties example

We’ve been looking at properties exclusive to the flex container, now we are going to turn our attention to the properties that can only be applied to the flex items. These include:

1.	Order
2.	Flex-grow 
3.	Flex-shrink
4.	Flex-basis
5.	Align-self 

##### Order

You can set the order of flex items inside a container, this is useful for re-ordering items for smaller devices. In Flexbox the order of the flex items is determined by an integer value. By default all of the flex items have an order value of 0. 

This means that they will be ordered depending on which item comes first. So in our example, we have five flex items with an order value of 0. Since they all have an order value of 0 by default, the order is determined based on how they are added in the HTML. 

So, the first flex item div with the number 1 is added first, this means that it comes first and then the second div and so on. If we want to change this order we can achieve this by using the order property on the flex item. 

Let’s say that we want to make the div with the number 5 to be the first one in the row, we can set this by setting its order property to a negative value like -1. Since a negative value is less than 0 this means that it will come before all of the other values that have their order set to 0 by default. Let’s see how this works, give the fifth div a class of i5: 

```html
<div class='wrapper'>
    <h1>Flexbox 101</h1>
    <div class='flex-container'>
      <div class='flex-item'>1</div>
      <div class='flex-item'>2</div>
      <div class='flex-item'>3</div>
      <div class='flex-item'>4</div>
      <div class='flex-item i5'>5</div>
    </div>
  </div>
```

Then in the style sheet set the order value in the class i5 to be negative 1:

```css
.i5 {
  order: -1;
}
```

When you view the result in the browser, you will notice that the flex item with number 5 now comes first:

![figure20](/images/figure22.png)

Likewise, if we want to move a flex item to the end of the row we can assign a positive integer value. For example, if we want to move the div with the number 1 inside it to the end, we can set it’s order value to 1. Like we did before, let’s add a class to the flex item with number 1 in it and call this class i1:

```html 
<div class='wrapper'>
    <h1>Flexbox 101</h1>
    <div class='flex-container'>
      <div class='flex-item i1'>1</div>
      <div class='flex-item'>2</div>
      <div class='flex-item'>3</div>
      <div class='flex-item'>4</div>
      <div class='flex-item i5'>5</div>
    </div>
  </div>
```

Then in the stylesheet we will target this class and set the order value to a positive integer:

```css
.i1 {
  order: 1;
}
```

In the browser, you will notice that the flex item with number 1 inside it is now at the end of the row of items:

![figure21](/images/figure23.png)

This is really useful, as it means we can easily rearrange items inside the flex container for smaller devices when creating responsive layouts. As we’ve mentioned already, the markup inside the DOM is not changed, so if you inspect the flex container with the dev tool you will see that the markup has not changed one bit: 

![figure22](/images/figure24.png)

##### Flex grow

The flex-grow, flex-shrink and flex-basis are typically used together. Let’s look at the flex-grow property first. This property increases the size of the flex-item, it increases either the width or height depending on the value that is set for the flex-direction. For the most part it will increase the width of the flex item. Back in the stylesheet if we set the flex-direction to row, and the align-items to flex-start, we can then set the flex-grow property for the flex items by a factor of 1: 

```css
.flex-item {
  background-color: #e66060;
  margin: 30px;
  font-size: 30px;
  color: #fff;
  padding: 20px;
  flex-grow: 1;
}
```

This will make the flex items take up all available space in the container evenly:

![figure23](/images/figure25.png)

We can also set individual flex items to grow a positive factor, the default value is 0 and any negative values are ignored by the browser. So if we set the flex item number 5 with the class i5 to have flex grow factor 2: 

```css
.i5 {
  order: -1;
  flex-grow: 2;
}
```

This means that it will grow twice the size of all other flex items in the container:

![figure24-1](/images/figure26.png)


##### Flex shrink

Another property that we can use to control the width of a flex item is the flex-shrink property. By setting the shrink value for flex item we are going to make that item smaller by the factor that we specify. So, for example, if we set the last flex item to have a shrink value of 2, this will make the size of the flex item smaller by a factor of two when compared to the size of the other flex items in the container. 

To see how this works we need to set width value for the flex items. So, let’s set the width for the flex-items class to have a width of 200px and remove the flex-grow property: 

```css
.flex-item {
  background-color: #e66060;
  margin: 30px;
  font-size: 30px;
  color: #fff;
  padding: 20px;
  width: 200px;
}
```

Then we can set the flex shrink for the last flex item, with the number 1 inside, to have a shrink value of a factor of 2: 

```css
.i1 {
  order: 1;
  flex-shrink: 2;
}
```

This will make the flex item shrink by a factor of 2 when compared to the other flex items width of 200px:

![figure25-1](/images/figure27.png)

This is useful for controlling the width of a flex item in comparison to other flex items in the container. So if you want to make sure that a certain element in your container to have a certain size when compared to another item, then you can use the `flex-shrink` property. To make the flex item shrink you need to set a higher positive number, so the higher the number the smaller the flex item will shrink.

##### Flex basis

If you want to set the width of a flex item to a fixed size you can use the flex-basis property. So let’s say for example that we want to set the first item, the item with number 5 inside it, to have a width of 500px. For this we can set the flex-basis to 500px:

```css
.i5 {
  order: -1;
  flex-basis: 500px;
}
```

This means that it will take 500px width in the flex container and the remaining flex items will take up the rest of the available width between them: 

![figure26-1](/images/figure28.png)

If we resize the window our flex item with 500px width will shrink, since the width available has decreased: 

![figure27](/images/figure29.png)

There are situations you want to keep a flex item fixed width, for this we can set the flex-grow and flex-shrink properties along with the flex-basis. So, we don’t want our flex item to grow or to shrink, we can add these two properties to the i5 class in the stylesheet:

```css
.i5 {
  order: -1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 500px;
}
```

So this sets our flex item to have a fixed width of 500px with the flex-basis, if the container width increases we do not want our flex item to grow, so we’ve set the flex-grow to 0, likewise if the width decreases we want to always have the fixed width of 500px, so for this we set the flex-shrink property value to 0. No if you resize the window, you will notice that our flex item always has the fixed width of 500px:

![figure28](/images/figure30.png)

We can use the shorthand for adding all three properties, i.e flex-grow, flex-shrink, and the flex-basis and shorten it like this using the flex property: 

```css
.i5 {
  order: -1;
  flex: 0 0 500px;
}
```

This will work exactly the same way as before.

##### Align self

The align-self property works in the same way as the align-items for the flex container in that it aligns the flex items in the cross axis, however, this property only applies to flex items. If you have align-items set in the flex container, the align-items property on a flex item will override that value. To see how this works, let’s add align-self to the first and last flex item, remember we already have align-items set to flex-start: 

```css
.i5 {
  order: -1;
  flex: 0 0 500px;
  align-self: center;
}

.i1 {
  order: 1;
  flex-shrink: 2;
  align-self: center;
}
```

This will make the first and last flex items in the container to be center aligned on the Cross Axis: 

![figure29](/images/figure31.png)

The align-self property can take several different values, but the most frequently used ones are as follows: 

1.	stretch 
2.	flex-start 
3.	center 
4.	flex-end 

As I mentioned already, there are more values that can be applied to the align-self, you can look at all of these values in more detail in the MDN docs pags: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items

There’s more we can dive into about Flexbox, but the properties that we covered are the most frequently used ones. Feel free to try out more Flexbox properties on your own – you can look at Flexbox in more in depth by visiting the MDN docs page: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox. 

However, the best way to learn Flexbox is to put it to practical use. So, we’re going to take what we have learned about Flexbox and create some real world user interfaces. We’re going to build 4 different real world user interfaces using Flexbox, these are: 

1.	Card component 
2.	Nav menu 
3.	Freelancer website 
4.	Blog entry layout

We’re going to explore how to create these different layouts in detail using Flexbox. I will be adding the links for each project with step-by-step instructions. 