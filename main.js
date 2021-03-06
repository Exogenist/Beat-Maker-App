window.onload = function () {
    //play token
    let playToken = false;
    let init = false;
    


    //display pads. The numbers in the pad are used to identify it.
    for (let x = 0; x < 16; x++) {
        $(".grid-container").append("<div class='grid-item'>" + x + "</div>");
    };
    //-----------------

    //Setup arrays and program init
    let gridArr = document.querySelectorAll(".grid-item");
    let state = {
        instrument: "kick",
        kick: [],
        snare: [],
        hihat: [],
        clap: [],
        shake: []
    };
    $($("#kickClr")).css("fill", "brown");
    //-----------------
    //console.log(gridArr)

    //load sounds and parts
    function partCreator() {
        let namePart = new Tone.Part((time, event) => {
            drum.triggerAttackRelease(event.note, event.dur, time);
            Tone.Draw.schedule(function () {
 
                if ($(gridArr[event.item]).css("border-top-color") !== "rgb(0, 0, 0)") {
                    $(gridArr[event.item]).css("opacity", 0.5).animate({
                        "opacity": 1
                    }, 300)
                }
                
//                                console.log($(gridArr[event.item]).css("border-color"))
            }, time);

        }, {});
        namePart.loop = Infinity;
        namePart.loopEnd = '1m';
        namePart.start(0);

        return namePart;
    }

    let drum = new Tone.Sampler({
        "C3": "./sounds/kick.mp3",
        "D3": "./sounds/snare.mp3",
        "E3": "./sounds/hihat.mp3",
        "F3": "./sounds/clap.mp3",
        "G3": "./sounds/shake.mp3"
    }, () => {}).toMaster();

    let kickPart = partCreator();
    let snarePart = partCreator();
    let hihatPart = partCreator();
    let clapPart = partCreator();
    let shakePart = partCreator();
    //-----------------


    function setup(time, note, dur, item) { // returns object to add to part
        return {
            time: time,
            note: note,
            dur: dur,
            item: item
        }
    }

    function parseTime(num) { // refactor this, sets up when to play a note
        if (num === "0") {
            return 0;
        }
        if (num === "1") {
            return "16n";
        }
        if (num > 1) {
            let temp = "16n";
            for (var i = 0; i < num - 1; i++) {
                temp = temp + "+16n"
            }
            return temp;
        }
    }

    //------------


    //Cosmetically switches state
    function loadState(val, color, stateInst) {
        for (let x = 0; x < 16; x++) {
            if (val.includes(gridArr[x].innerHTML)) {
                $(gridArr[x]).css("border-color", color);
            } else {
                $(gridArr[x]).css("border-color", "black");
            }
        }
    }

    function stateBtn() {
        $("#kick").on("click", (e) => {
            state.instrument = e.currentTarget.id;
            $($("#kickClr")).css("fill", "brown");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            $($(".clapClr")).attr("fill", "#C5EFE5");
            $($(".shakeClr")).attr("fill", "#C5EFE5");
            loadState(state.kick, "brown");
        });
        $("#snare").on("click", (e) => {
            state.instrument = e.currentTarget.id;
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "gold");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            $($(".clapClr")).attr("fill", "#C5EFE5");
            $($(".shakeClr")).attr("fill", "#C5EFE5");
            loadState(state.snare, "gold");
        });
        $("#hihat").on("click", (e) => {
            state.instrument = e.currentTarget.id;
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "lightGreen");
            $($(".clapClr")).attr("fill", "#C5EFE5");
            $($(".shakeClr")).attr("fill", "#C5EFE5");
            loadState(state.hihat, "lightGreen");
        });
        $("#clap").on("click", (e) => {
            state.instrument = e.currentTarget.id;
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            $($(".clapClr")).attr("fill", "blue");
            $($(".shakeClr")).attr("fill", "#C5EFE5");
            loadState(state.clap, "blue");
        });
        $("#shake").on("click", (e) => {
            state.instrument = e.currentTarget.id;
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            $($(".clapClr")).attr("fill", "#C5EFE5");
            $($(".shakeClr")).attr("fill", "pink");
            loadState(state.shake, "pink");
        });
    }
    stateBtn();

    //turns on pad buttons
    for (let x = 0; x < 16; x++) {
        $(gridArr[x]).on("mousedown", () => {
            //check the state of the button
//            console.log($(gridArr[x]).css(["border-top-color","border-bottom-color", "border-right-color", "border-left-color"]) )
            
//            $(gridArr[x]).css(["border-top-color","border-bottom-color", "border-right-color", "border-left-color"], "brown")
            
//console.log($(gridArr[x]).css("border-top-color"))
            
            if ($(gridArr[x]).css("border-top-color") == "rgb(0, 0, 0)") {
                //TURN ON
                if (state.instrument == "kick") {
                    $(gridArr[x]).css("border-color", "brown");
                    
//                    $(gridArr[x]).css("border-top-color","brown");
//                    document.querySelector(".grid-item").style.borderTopColor = "blue";
                    state.kick.push(gridArr[x].innerHTML);
                    kickPart.add(setup(parseTime(gridArr[x].innerHTML), "C3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('C3');
                    }

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "gold");
                    state.snare.push(gridArr[x].innerHTML);
                    snarePart.add(setup(parseTime(gridArr[x].innerHTML), "D3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('D3');
                    }

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "lightGreen");
                    state.hihat.push(gridArr[x].innerHTML);
                    hihatPart.add(setup(parseTime(gridArr[x].innerHTML), "E3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('E3');
                    }

                } else if (state.instrument == "clap") {
                    $(gridArr[x]).css("border-color", "blue");
                    state.clap.push(gridArr[x].innerHTML);
                    clapPart.add(setup(parseTime(gridArr[x].innerHTML), "F3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('F3');
                    }

                } else if (state.instrument == "shake") {
                    $(gridArr[x]).css("border-color", "pink");
                    state.shake.push(gridArr[x].innerHTML);
                    shakePart.add(setup(parseTime(gridArr[x].innerHTML), "G3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('G3');
                    }

                }
            } else {
                //TURN OFF
                if (state.instrument == "kick") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.kick.splice(state.kick.indexOf(x.toString()), 1);
                    kickPart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.snare.splice(state.snare.indexOf(x.toString()), 1);
                    snarePart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.hihat.splice(state.hihat.indexOf(x.toString()), 1);
                    hihatPart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "clap") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.clap.splice(state.clap.indexOf(x.toString()), 1);
                    clapPart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "shake") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.shake.splice(state.shake.indexOf(x.toString()), 1);
                    shakePart.remove(parseTime(gridArr[x].innerHTML));

                }
            }

        });
    }
    
    $("body").on("click", () => {
        if(init === false) {

            var synth = new Tone.Synth({volume: "-127", mute: true}).toMaster();
            
            synth.triggerAttackRelease('C4', '8n');
            init = true;
        };
          
    });

    $("#play").on("click", (e) => {
        playToken = true;
        Tone.Transport.start('+0.1');
        $("#stop").attr("display", "inline");
        $( "#control" ).text("STOP");
    });

    $("#stop").on("click", (e) => {
        playToken = false;
        Tone.Transport.stop();
        $("#stop").attr("display", "none");
        $( "#control" ).text("PLAY");
    });

    //    Tempo slider
    let tempo = document.getElementById("tempo");
    let tempoNum = document.getElementById("tempo-num");
    tempoNum.innerHTML = tempo.value;
    tempo.oninput = function () {
        tempoNum.innerHTML = this.value;
    }
    tempo.addEventListener("input", function (e) {
        Tone.Transport.bpm.value = parseInt(e.target.value);
    });


    // Swing slider
    let swing = document.getElementById("swing");
    let swingNum = document.getElementById("swing-num");
    swingNum.innerHTML = swing.value;
    swing.oninput = function () {
        swingNum.innerHTML = this.value;
    }
    swing.addEventListener("input", function (e) {
        Tone.Transport.swing = parseInt(e.target.value) / 100;
    });

    //                Tone.Transport.swing = 0.15;

    //INFOMODAL - code from w3schools
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}
