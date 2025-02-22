// Function to fetch SMILES from PubChem and render the molecule using SmilesDrawer
function renderMolecule() {
    const formula = document.getElementById("chemicalFormula").value.trim();
    if (!formula) {
      alert("Please enter a valid chemical formula.");
      return;
    }
  
    // Use PubChem API to fetch the Isomeric SMILES string for the given compound
    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${formula}/property/IsomericSMILES/JSON`)
      .then(response => response.json())
      .then(data => {
        if (data.PropertyTable && data.PropertyTable.Properties.length > 0) {
          const smiles = data.PropertyTable.Properties[0].IsomericSMILES;
          // Use SmilesDrawer to parse and render the SMILES string
          SmilesDrawer.parse(smiles, function(tree) {
            const drawer = new SmilesDrawer.Drawer({width: 400, height: 400});
            drawer.draw(tree, 'moleculeCanvas', 'light', false);
          }, function(err) {
            console.error("Error parsing SMILES:", err);
            alert("Error parsing molecule data.");
          });
        } else {
          alert("Molecule not found. Try a different formula.");
        }
      })
      .catch(error => {
        console.error("Error fetching molecule data:", error);
        alert("Failed to retrieve molecule data.");
      });
}

// Event listener to trigger renderMolecule function when "Enter" is pressed
document.getElementById("chemicalFormula").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission (if wrapped in form)
        renderMolecule();        // Trigger the molecule rendering
    }
});
