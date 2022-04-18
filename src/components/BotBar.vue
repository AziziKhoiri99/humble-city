<template>
<div>
  <ul class="nav fixed-bottom navbar-dark bg-success">
    <li class="nav-link active" aria-current="page" href="#">
        <img src="../assets/image/acai.png" width="30px" class="rounded" alt="...">
    </li>
    <li class="nav-link" href="#">
        Friends
      <span class="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-microphone"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-video"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-tv"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-face-smile"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-angle-right"></i>
    </li>
    <!-- <span class="float-end">     -->
    <li class="nav-link" href="#">
        <i class="fa-solid fa-hammer"></i>    
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-calendar-days"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-comments"></i>
    </li>
    <li class="nav-link" href="#">
        <i class="fa-solid fa-user-group" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
    </li>
    <!-- </span> -->
    <div class="offcanvas offcanvas-end bg-success" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Offcanvas right</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        ...
    </div>
    </div>
  </ul>
</div>
</template>

<style scoped>
li {
    color: white;
    text-decoration: none;
}
li:hover {
    color: white;
    text-decoration: none;
}

</style>