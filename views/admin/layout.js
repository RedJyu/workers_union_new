export const layoutAdmin = ({ content }) => {
  return `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="/main.css">
   <!-- Add Quill CSS -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>


 <script >
  document.addEventListener("DOMContentLoaded", function() {
    const quill = new Quill("#editor", {
      theme: "snow" 
    });
    const form = document.getElementById("postForm");
    const quillContentInput = document.getElementById("quillContent");

    form.addEventListener("submit", async (event) => {
    
      
      const title = form.elements.title.value;
      const content = quill.root.innerHTML;
      quillContentInput.value = content;
      const imageUrl = form.elements.imageUrl.value;
      
 

    });
  });
</script>


</head>
<body>
<div class="container">
    ${content}
</div>
</body>
</html>
`;
};
