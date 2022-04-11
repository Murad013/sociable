const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
      })
    });

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      })
    });
    
    if(overlay)
    {overlay.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal.active');
      modals.forEach(modal => {
        closeModal(modal);
      })
    });}

    function openModal(modal) {
      if (modal == null) 
          return;
      else{
        modal.classList.add('active');
        overlay.classList.add('active');
      }
    }
    function closeModal(modal) {
      if (modal == null) return

      modal.classList.remove('active');
      overlay.classList.remove('active');
    }

//     <button data-modal-target="#modal">Add Profile Information</button>
//                 <div className='modal active' id='modal'>
//                     <div className='modal-header'>
//                       <div className='title'>Profile Setup</div>
//                       <button data-close-button className='close-button'>&times;</button>
//                     </div>
//                     <div className='modal-body'>
//                       <h3>Bio</h3>
//                       <input type = "text" placeholder='Bio' value={bio} name = "bioCreate" onChange ={(e) => {setBio(e.target.value);}}/>
//                       <button onClick={editProfileInfo}>Submit!</button>
//                     </div>
//                 </div>
//                 <div id='overlay'></div>