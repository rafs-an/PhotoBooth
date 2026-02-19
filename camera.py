import cv2

input = cv2.VideoCapture(0)

while (input.isOpened()):
    ret , frame = input.read()

    cv2.imshow('AmyesCam', frame)

    key = cv2.waitKey(1) & 0xFF

    if key == ord('c'):
        cv2.imwrite('snap.png',frame)
    elif key == ord('q'):
         break    

input.release()
cv2.destroyAllWindows()

