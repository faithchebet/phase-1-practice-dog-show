document.addEventListener('DOMContentLoaded', () => {



    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
  
    
    const fetchDogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/dogs');
        const dogs = await response.json();
        renderDogsTable(dogs);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  
    
    const renderDogsTable = (dogs) => {
      tableBody.innerHTML = ''; 
  
      dogs.forEach((dog) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button class="edit-btn" data-id="${dog.id}">Edit</button></td>
        `;
        tableBody.appendChild(row);
      });
  
      
      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach((button) => {
        button.addEventListener('click', () => handleEditDog(button.dataset.id));
      });
    };
  
    
    const handleEditDog = async (dogId) => {
      try {
        const response = await fetch(`http://localhost:3000/dogs/${dogId}`);
        const dog = await response.json();
  
        
        dogForm.name.value = dog.name;
        dogForm.breed.value = dog.breed;
        dogForm.sex.value = dog.sex;
  
        
        dogForm.addEventListener('submit', (e) => handleUpdateDog(e, dogId));
      } catch (error) {
        console.error('Error fetching dog for editing:', error);
      }
    };
  
    
    const handleUpdateDog = async (e, dogId) => {
      e.preventDefault();
  
      const formData = new FormData(dogForm);
      const updatedDog = {
        name: formData.get('name'),
        breed: formData.get('breed'),
        sex: formData.get('sex'),
      };
  
      try {
        
        await fetch(`http://localhost:3000/dogs/${dogId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDog),
        });
  
        
        fetchDogs();
      } catch (error) {
        console.error('Error updating dog:', error);
      }
    };
  
    
    fetchDogs();
});
  