/* Exercise 2.1: Course information

Exercise 1.1 - 1.5: Course information
  In this exercise you will create a simple React application that displays information about a course. The application will consist of several components that work together to display the course name, parts, and the total number of exercises.

  The main component is App, which contains the course information and renders the Header, Content, and Total components. The Header component displays the course name, the Content component displays the parts of the course, and the Total component calculates and displays the total number of exercises.
*/

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts[0].exercises +
       props.parts[1].exercises +
       props.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return <Course course={course} />
  
}

export default App /**/