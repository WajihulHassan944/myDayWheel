/**
 * Created by EquatorTechnologies on 5/24/16.
 */
$(function() {
    /* ==========================================================================
     Logout
     ========================================================================== */
    $("#logout").click(function() {
        localStorage.removeItem('token');
        localStorage.removeItem('User_id');
        localStorage.removeItem('User_name');
        localStorage.removeItem('full_name');
        window.location.href = "index.php";
    });
});