main()

async function main(){
    const img = canvas.scene.background.src;

    const clearimg = "Images/WM/tbpenguin_yonarit_blank.png";
    const filedimg = "Images/WM/tbpenguin_yonarit_blank_countryLines.png";

    if (img == clearimg) {
        canvas.scene.update({"background.src": filedimg});
        ui.notifications.info("Domain's shown");
        return;
    }

    if (img == filedimg) {
        canvas.scene.update({"background.src": clearimg});
        ui.notifications.info("Domain's hidden");
        return;
    }

    if (img != clearimg || img != filedimg) {
        ui.notifications.warn("Curently in the wrong scene.");
        return;
    }
}

