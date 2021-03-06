import React from 'react';
import './App.css';
import contacts from './contacts.json';
 
class App extends React.Component {
  state = {
    celebrities: contacts.slice(0,5)
  }
 
  ButtonRandom = () => {
 
    let clonedCeleb1 = [...this.state.celebrities]
 
    let randomCel = contacts[Math.floor(Math.random()*contacts.length)]
    clonedCeleb1.push(randomCel)
 
    this.setState({
      celebrities: clonedCeleb1
    })
  }
 
  SortedByName = () => {

    let clonedCeleb2 = [...this.state.celebrities]

    clonedCeleb2.sort((a,b) =>{
      if (a.name<b.name){
        return -1
      } else if (a.name>b.name) {
        return 1
      } else {
        return 0
      }
    })

    this.setState({
      celebrities: clonedCeleb2
    })
  }

  SortedByPopularity = () => {

    let clonedCeleb3 = [...this.state.celebrities]

    clonedCeleb3.sort((a,b) =>{
      return (b.popularity-a.popularity)
    })

    this.setState({
      celebrities: clonedCeleb3
    })
  }

  DeleteButton = (celebId) => {

    let clonedCeleb4 = [...this.state.celebrities]

    let celebIndex = clonedCeleb4.findIndex( element => element.id === celebId);
    clonedCeleb4.splice(celebIndex, 1);
    
    this.setState({
      celebrities: clonedCeleb4
    })
  }


  render() {
    const UpdatedList = (elem) => {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="TableImage">
                    <img src={elem.pictureUrl}/>
                  </div>
                </td>
                <td>{elem.name}</td>
                <td>{elem.popularity}</td>
                <td className = "DeleteButton">
                  <button onClick={elem.clickToDelete}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      ) 
    }


    const contactList = this.state.celebrities.map(elem => { 
      return(
          <React.Fragment>
            <UpdatedList key={elem.id} 
            clickToDelete={()=> this.DeleteButton(elem.id)} {...elem}/>
          </React.Fragment> 
        )
    })

      const table =      
      <table>
        <thead>
          <tr>
            <th>picture</th>
            <th>name</th>
            <th>popularity</th>
            <th>action</th>
            
          </tr>
        </thead>
        </table>

    return (
      <React.Fragment>
      <h1>IronContacts</h1>
      <div className="MainContainer"> 
        <div className="MainButtons">
          <button onClick={this.ButtonRandom}>Add Random Celeb</button>
          <button onClick={this.SortedByName}>Sort By Name</button> 
          <button onClick={this.SortedByPopularity}>Sort By Popularity</button>
        </div>
        <tbody>
        {table}
        {contactList}
        </tbody>
      </div>
      </React.Fragment>
    )     
  }
}
 
export default App;
