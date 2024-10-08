renderer.create(document.getElementById("stage"));
window.wadRead = () => {
    //Read our wad data.
    wad.TYPE = wad.ReadString(0,4);
    console.log(`Wad is an ${wad.TYPE}`);

    wad.LUMPCOUNT = wad.Read4Bytes(4);
    console.log(`Wad has ${wad.LUMPCOUNT} lumps`);

    wad.LUMPOFFSET = wad.Read4Bytes(8);
    console.log(`Lumps start at ${wad.LUMPOFFSET}`);
    
    //Make lump directory
    wad.DIRECTORY = [];
    for (let lumpID = 0; lumpID < wad.LUMPCOUNT; lumpID++) {
        const readID = wad.LUMPOFFSET + (lumpID * 16);
        wad.DIRECTORY.push({
            Name:wad.ReadString(readID + 8,8),
            Offset:wad.Read4Bytes(readID),
            Size:wad.Read4Bytes(readID + 4)
        });
    }

    decorate.parse();

    //Graphic
    pallete.readPlayPal();
    textures.registerAll();

    if (wad.FindFirstLumpOfName("MAP01") >= 0) {
        levelParser.read("MAP01");
    }
    else if (wad.FindFirstLumpOfName("E1M1") >= 0) {
        levelParser.read("E1M1");
    }
    else {
        console.error("No first map.");
    }
}