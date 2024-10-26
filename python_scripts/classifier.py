from ultralytics import YOLO
import sys

model = YOLO('D:\\web_dev\\React\\Farmer\\runs\\classify\\train\\weights\\best.pt')

def classify(img):
    results=model(img)

    names = results[0].names
    probs = results[0].probs

    name=names[probs.top1]
    conf = float(probs.top1conf)
    if conf < 0.5:
        return "Fail"
    return f'${name}'

if __name__ == '__main__':
    # Accept the image path as a command-line argument
    img_path = sys.argv[1]
    print(classify(img_path))
