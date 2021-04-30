f = open("scienceSubjects.txt","r")
import colorsys
import numpy as np
import cv2

def makeSubjects(inputn, outputn, imagen, starting_id, color_range_start, color_offset):
    pixel_size = 15
    colors = np.zeros((50*pixel_size,pixel_size,3))
    # store hexValues:
    hexValues = []

    # loop through range and create spectrum of colors
    for i in range(50):
        # create color list:
        rgb = colorsys.hsv_to_rgb(i / color_range_start + color_offset, 1.0 , 1.0)
        # add this to numpy array, so it be displayed as an image:
        rgb_value = [round(255*x) for x in rgb]
        colors[i*pixel_size:(i+1)*pixel_size] = rgb_value

        hex = "#{0:02x}{1:02x}{2:02x}".format(rgb_value[0],rgb_value[1],rgb_value[2])
        hexValues.append(hex)

    cv2.imwrite(imagen, colors)

        # open input file:
    f = open(inputn,"r")
    id_ = starting_id
    # initialize output string:
    output = '['
    # parse science subjects:
    i = 0
    for item in f:
        if item != '':
            output += '\n\t{"id": ' + str(id_) + ', "name": "' + item.strip() + '", "color": "' + hexValues[i] + '"},'
            id_ += 1
            i += 1
    # remove last comma:
    output = output.strip(",")
    # finish off list:
    output += '\n]'
    f.close()
    # write to file:
    f = open(outputn,"w")
    f.write(output)
    f.close()
    print(output)

# The values of 250 and 12/50 will give mostly green colors for science
makeSubjects("scienceSubjects.txt", "subjectsScience.json", "scienceColors.jpg", 50, 250, (12/50))
# The values of 300 and 2/50 will give mostly blue colors for math:
makeSubjects("mathSubjects.txt", "subjectsMath.json", "mathColors.jpg", 0, 300, (2/50))
# the values of 300 and 25/50 will give mostly yellow and red colors for humanities
makeSubjects("humanitiesSubjects.txt", "subjectsHumanities.json", "humanitiesColors.jpg", 100, 300, (25/50))