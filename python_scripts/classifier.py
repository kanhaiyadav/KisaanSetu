from ultralytics import YOLO

model = YOLO('./runs/classify/train/weights/best.pt')

def classify(img):
    results=model(img)

    names = results[0].names
    probs = results[0].probs

    name=names[probs.top1]
    conf = float(probs.top1conf)
    if conf < 0.5:
        return "Fail"
    return name
