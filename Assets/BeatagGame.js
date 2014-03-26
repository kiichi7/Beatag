#pragma strict
var darkColor : Color;
var brightColor : Color;
private var beatGap : float;
private var timer : float;
var theRoads : String[];
private var theRoad : String;
var nowPosition : int;
private var upSpeed : float = 1.081633;

function Start () {

	if (TheChoosen.theNumber == -1) TheChoosen.theNumber = Random.Range(0,10);
	theRoad = theRoads[TheChoosen.theNumber];
	camera.backgroundColor = darkColor;
	nowPosition = 0;

}

function Update () {

	if (GetComponent(GUIController).IsStarted ()) {
		for (var c : char in Input.inputString) {
			if (c == theRoad[nowPosition]) ;
			else if ((nowPosition > 0)&&(c == theRoad[nowPosition-1])) {
				nowPosition --;
				audio.pitch = Mathf.Pow(upSpeed, nowPosition);	
			}
			else if ((nowPosition < theRoad.Length-1)&&(c == theRoad[nowPosition+1])) {
				nowPosition ++;
				audio.pitch = Mathf.Pow(upSpeed, nowPosition);
			}
			else {
				audio.pitch = 0.33;
				GetComponent(GUIController).SetStatus(3);
			}
			if (nowPosition == theRoad.Length-1) {
				audio.pitch = 0.66;
				TheChoosen.theNumber = Random.Range(0,10);
				GetComponent(GUIController).SetStatus(4);
			}
		}
	}
	
	if (timer < beatGap*3/4) ColorUp();
	else ColorDown();
	
	if (!audio.isPlaying){
	    audio.Play();
	    beatGap = timer;
	    timer = 0;
	}
	timer += Time.deltaTime;
	
}

function ColorUp () {

	camera.backgroundColor = 2 * timer / beatGap * (brightColor - darkColor);

}

function ColorDown () {

	camera.backgroundColor = darkColor;
	
}
