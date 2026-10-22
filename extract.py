import cv2
import sys

def extract_frames(video_path, output_dir, timestamps):
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Video FPS: {fps}")

    for idx, (t_sec, name) in enumerate(timestamps):
        frame_idx = int(t_sec * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if ret:
            out_path = f"{output_dir}/{name}.jpg"
            cv2.imwrite(out_path, frame)
            print(f"Saved {out_path} at {t_sec}s")
        else:
            print(f"Failed to extract frame at {t_sec}s")

    cap.release()

if __name__ == "__main__":
    import os
    video_file = "D:/wedding/WhatsApp Video 2026-08-12 at 12.37.29.mp4"
    out_dir = "D:/wedding/react-invite/public/assets"
    os.makedirs(out_dir, exist_ok=True)
    
    # Timestamps from the video for the exact images needed
    times = [
        (1.0, "gate_bg"),      # Base background
        (4.0, "hero_couple"),  # Couple illustration
        (12.0, "haldi_thumb"), # Haldi thumbnail
        (33.0, "mehndi_thumb"), # Mehndi thumbnail
        (47.0, "sangeet_thumb"), # Sangeet thumbnail
        (14.0, "haldi_reveal"), # Haldi revealed image
        (40.0, "mehndi_reveal"), # Mehndi revealed image
        (50.0, "sangeet_reveal") # Sangeet revealed image
    ]
    
    extract_frames(video_file, out_dir, times)
