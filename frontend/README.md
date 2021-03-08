# Frontend Tests

Test the user interface via end-to-end tests that interact with the backend to display correct input and output screens. Visual results are to be checked manually, to confirm the funtionality and display of the [Input box](https://github.com/cs130-w21/22/tree/master/frontend/src/components/Input) (text input and file upload) and [Output box](https://github.com/cs130-w21/22/tree/master/frontend/src/components/Output) ([Idle screen](https://github.com/cs130-w21/22/tree/master/frontend/src/components/IdleScreen), [Calculating screen](https://github.com/cs130-w21/22/tree/master/frontend/src/components/CalculatingScreen), and [Result screen](https://github.com/cs130-w21/22/tree/master/frontend/src/components/ValidScreen)).

### Test #1: Text Input User Flow

#### Step 1

Follow setup instructions in the [repository README](https://github.com/cs130-w21/22/blob/master/README.md) to run backend Flask server and frontend React application. Navigate to http://localhost:3000/ in your browser and you should see the following screen.

<img width="1280" alt="Screen Shot 2021-03-07 at 4 44 19 PM" src="https://user-images.githubusercontent.com/40625355/110261269-5ede0d80-7f64-11eb-9f3c-1e0faf42a6ce.png">

#### Step 2

Test inputting text, which should be active by default (the `Text Input` tab should be purple instead of gray and text input box on display). Copy onto your clipboard the sample EULA document provided in [test/sample_eula.txt](https://github.com/cs130-w21/22/blob/master/frontend/test/sample_eula.txt) and paste into where the box says `Paste your agreement`.

<img width="1280" alt="Screen Shot 2021-03-07 at 4 52 55 PM" src="https://user-images.githubusercontent.com/40625355/110261568-926d6780-7f65-11eb-8a2c-fa0c5d1c4075.png">

#### Step 3

Press the `Calculate` button to make a request to the backend server. This should take from 10 seconds to a minute for the backend to calculate, depending on the coumputational power of your local machine. In the meantime, you should see a screen on the right-hand-side box showing that the calculation is in progress.

<img width="1280" alt="Screen Shot 2021-03-07 at 4 56 23 PM" src="https://user-images.githubusercontent.com/40625355/110261697-0f98dc80-7f66-11eb-8c59-f99cf35bf2de.png">

#### Step 4

When the results are returned, check that the screen looks as shown below. This EULA example should be classified as ethical as shown in the green box, and several lines of summary should be provided as well.

<img width="1280" alt="Screen Shot 2021-03-07 at 4 57 32 PM" src="https://user-images.githubusercontent.com/40625355/110261741-39520380-7f66-11eb-9435-9bc6647a9286.png">

### Test #2: Upload PDF User Flow

#### Step 1

Follow the same setup instructions as in **Test #1: Step 1** to run the application. Click on the gray `Upload PDF` tab, which should now be purple and show the screen below.

<img width="1280" alt="Screen Shot 2021-03-07 at 5 00 39 PM" src="https://user-images.githubusercontent.com/40625355/110261856-a6fe2f80-7f66-11eb-9249-52883be3491d.png">

#### Step 2

Download to your local machine a second sample EULA document in PDF format, [test/sample_eula.pdf](https://github.com/cs130-w21/22/blob/master/frontend/test/sample_eula.pdf), as this application takes only PDF files as input. Click on the blue area in the input box titled `Drag and drop your file here or Browse your computer`. A window should pop up to select your file as such.

<img width="1280" alt="Screen Shot 2021-03-07 at 5 08 21 PM" src="https://user-images.githubusercontent.com/40625355/110262189-ba5dca80-7f67-11eb-8d15-66c2310cc5a7.png">

Alternatively, you may drag and drop a file from your local machine into the box as long as it is a PDF. You should see the following screen when the file is selected.

<img width="1280" alt="Screen Shot 2021-03-07 at 5 11 21 PM" src="https://user-images.githubusercontent.com/40625355/110262309-26403300-7f68-11eb-9763-36648603f548.png">

#### Step 3

Press the `Calculate` button to make a request to the backend server. The same right-hand-side calculating screen should be displayed as in **Test #1: Step 3**.

<img width="1280" alt="Screen Shot 2021-03-07 at 5 12 33 PM" src="https://user-images.githubusercontent.com/40625355/110262365-512a8700-7f68-11eb-9358-60cabb152da8.png">

#### Step 4

The following screen should be displayed when the calculation finishes. For this example, the EULA is unethical as shown in the red box along with a brief summary.

<img width="1280" alt="Screen Shot 2021-03-07 at 5 14 09 PM" src="https://user-images.githubusercontent.com/40625355/110262440-8931ca00-7f68-11eb-9550-b909a07aa8fb.png">
