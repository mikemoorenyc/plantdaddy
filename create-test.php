<form method="POST" action="/endpoints/create-account/?form=1">
  <input type="hidden" id="login_noonce" name="login_noonce" value="<?= $_SESSION['login_noonce'];?>" />
  <?php
    $sections =['first_name','email','password','telephone'];
    foreach($sections as $s) {
      ?>
      <label><?= $s;?></label><br/>
      <input type="text" value="" id="<?= $s;?>" name="<?= $s;?>"/>
      <br/><br/>
      <?php
    }
  ?>




  <button type="submit">submit</button>
</form>
