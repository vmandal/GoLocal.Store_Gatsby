import React  from "react"
import { Link, graphql, useStaticQuery } from 'gatsby'

const Locations = props => {
    
    const data = useStaticQuery(graphql`
    query  {
      allDirectory(filter: { sourceInstanceName: { eq: "data-location" } }){
          edges{
            node{
              name
              relativePath
              relativeDirectory
            }
          }
        }
      }
    `);

    var locationMenu = {}
    var slashCount, parent
    data.allDirectory.edges.forEach(edge => {

      /*path = edge.node.relativeDirectory.replace("data/location/", "");
      let pathArray = path.split('/')
      pathArray.forEach(element => {
        if (locationMenu.hasOwnProperty(element)){
          if (locationMenu.hasOwnProperty(element)){

          }else{

          }

        }else{
          locationMenu.element = {}
        }
        
      });*/

      slashCount = edge.node.relativePath.split("/").length - 1
      //console.log('slashCount', slashCount)

      if ((slashCount === 0) && (edge.node.relativePath !=='')) { // IN
        locationMenu[edge.node.name] = {}
        //locationMenu[edge.node.name].name = edge.node.name
        locationMenu[edge.node.name].url = edge.node.relativePath
        locationMenu[edge.node.name].subDir = {}
      }

      if (slashCount === 1) { // IN/Delhi
        //parent = edge.node.relativeDirectory.replace("data/location/", "");        
        parent = edge.node.relativeDirectory;        
        locationMenu[parent].subDir[edge.node.name] = {}
        locationMenu[parent].subDir[edge.node.name].url = edge.node.relativePath
        locationMenu[parent].subDir[edge.node.name].subDir = {}
      }

      if (slashCount === 2) { // IN/Delhi/Dwarka
        parent = edge.node.relativeDirectory 
        //parent = parent.replace('/' + edge.node.name, '')
        let parents = parent.split('/')
        locationMenu[parents[0]].subDir[parents[1]].subDir[edge.node.name] = {}
        locationMenu[parents[0]].subDir[parents[1]].subDir[edge.node.name].url = edge.node.relativePath
        locationMenu[parents[0]].subDir[parents[1]].subDir[edge.node.name].subDir = {}
      }



    });

    //console.dir(locationMenu)  

    function getSubMenus(dir){
      if (Object.entries(dir).length === 0 && dir.constructor === Object) return;
           
      return (
        <ul>
        {Object.keys(dir).map((objKey,index)=>{
        return (
          <React.Fragment key={dir[objKey].url}>
            <li>
              <Link  to={`/${dir[objKey].url}`} >{objKey}</Link>
            </li> 
            {getSubMenus( dir[objKey].subDir )}         
          </React.Fragment>
        )                 

        })}   
        </ul>
      )
    }

    return (
        <>
        <h4>Locations</h4>

       {Object.keys(locationMenu).map((objKey,index)=>(
        <li key={locationMenu[objKey].url}>
                <Link  to={`/${locationMenu[objKey].url}`} >{objKey}</Link>
                {getSubMenus(locationMenu[objKey].subDir)}
        </li>
       ))}   
        </>        
    )
};

export default Locations;    