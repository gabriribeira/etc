import React from "react";
import '../../index.css';

const Activity = () => {
    return (
       <div>
    <p className="pl-5 pt-5 pb-5"><b>Activity</b></p>
    <div className="atividade">
        <img src="src/assets/data/users/lara.webp" className="fotouser" alt="" srcSet="" />
        <div className="descricao-atividade">
            <p><b>Paulo</b> added <b>Cerveja Super Bock</b> to the shopping list.</p>
            <p className="thin">&middot; 30 minutes ago</p>
            
        </div>
    </div>
    <div className="atividade">
        <img src="./src/assets/data/users/lara.webp" className="fotouser" alt="" srcSet="" />
        <div className="descricao-atividade">
            <p><b>Mariana Marques</b> added <b>Nachos</b> to the shopping list.</p>
            <p className="thin">&middot; 1 hour ago</p>
        </div>
    </div>
    <div className="atividade">
        <img src="./src/assets/data/users/lara.webp" className="fotouser" alt="" srcSet="" />
        <div className="descricao-atividade">
            <p><b>Gabriel Ribeira</b> started <b>Secret Santa Shopping List</b></p>
            <p className="thin">&middot; 2 hours ago</p>
        </div>
    </div>
  </div>

  );
 };
  
 export default Activity;

