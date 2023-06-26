export const layoutUser = ({ content }) => {
  return `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="/main.css">
   
</head>
<body>
<div class="container flow">
    ${content}
</div>
</body>
</html>
`;
};
