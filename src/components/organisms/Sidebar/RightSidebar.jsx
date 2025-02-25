import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActiveSectors } from "../../../redux/sectorsSlice";
import { styled } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  Box,
  IconButton,
  Typography,
  InputBase,
  Modal,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 294;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  marginTop: "64px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `60px`,
  backgroundColor: theme.palette.primary.main,
  marginTop: "64px",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
}));

const AdvDecSection = ({ open }) => {
  const [advDecData] = useState({ adv: 15, neutral: 10, dec: 8 });

  return (
    <Box
      sx={{
        padding: open ? "16px" : "8px",
        transition: "0.3s",
        marginTop: "-30px",
      }}
    >
      {open ? (
        <>
          <Typography
            variant="body1"
            sx={{ color: "#fff", fontWeight: "400px", fontSize: "12px" }}
          >
            ADV/DEC
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#222",
              height: "16px",
              marginTop: "4px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                background: "red",
                flex: advDecData.dec,
                minWidth: "10px",
                textAlign: "center",
                fontSize: "10px",
                color: "white",
              }}
            >
              {advDecData.dec}
            </Box>
            <Box
              sx={{
                background: "#39D353",
                flex: advDecData.adv,
                minWidth: "10px",
                textAlign: "center",
                fontSize: "10px",
                color: "black",
              }}
            >
              {advDecData.adv}
            </Box>
            <Box
              sx={{
                background: "#0F8C42",
                flex: advDecData.neutral,
                minWidth: "10px",
                textAlign: "center",
                fontSize: "10px",
                color: "white",
              }}
            >
              {advDecData.neutral}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "8px",
            }}
          >
            <Typography variant="caption" sx={{ color: "red" }}>
              ⬛ 0 TO 2.5 %
            </Typography>
            <Typography variant="caption" sx={{ color: "#39D353" }}>
              ⬛ 2.5%-5%
            </Typography>
            <Typography variant="caption" sx={{ color: "#0F8C42" }}>
              ⬛ 5%
            </Typography>
          </Box>
        </>
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            margin: "10px auto",
            cursor: "pointer",
          }}
        >
          📊
        </Typography>
      )}
    </Box>
  );
};

const TopNewsSection = ({ open, onViewAll }) => {
  return (
    <Box
      sx={{
        padding: open ? "16px" : "8px",
        transition: "0.3s",
        marginTop: "-24px",
      }}
    >
      {open ? (
        <Box
          sx={{
            background: "#272D35",
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "172px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#272D35",
              borderRadius: "8px",
              padding: "8px",
              height: "50px",
              marginTop: "-px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: "12px",
                marginLeft: "px",
                whiteSpace: "nowrap",
              }}
            >
              Top News
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                padding: "4px",
                borderRadius: "4px",
                width: "220px",
                marginLeft: "20px",
              }}
            >
              <SearchIcon
                sx={{ color: "#222", fontSize: "16px", marginRight: "4px" }}
              />
              <InputBase
                placeholder="Search stocks and sectors"
                sx={{
                  fontSize: "12px",
                  color: "#222",
                  flex: 1,
                  height: "15px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ border: "1px solid #ffffff", marginTop: "-100px" }}></Box>

          <Typography
            variant="body2"
            sx={{
              color: "#39D353",
              textAlign: "right",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={onViewAll}
          >
            View All
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📰
        </Typography>
      )}
    </Box>
  );
};

const AnotherSection = ({ open }) => {
  const dispatch = useDispatch();
  const { sectors, loading, error, lastUpdated } = useSelector(
    (state) => state.sectors
  );
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    if (!lastUpdated || Date.now() - new Date(lastUpdated).getTime() > 60000) {
      dispatch(fetchActiveSectors());
    }
  }, [dispatch, lastUpdated]);

  const handleViewAll = () => {
    setViewAll(true);
    dispatch(fetchActiveSectors());
  };

  return (
    <Box
      sx={{
        padding: open ? "16px" : "8px",
        transition: "0.3s",
        marginTop: "-24px",
        height: "242px",
      }}
    >
      {open ? (
        <Box
          sx={{
            background: "#272D35",
            borderRadius: "8px",
            padding: "8px",
            height: "172px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#fff", fontSize: "12px", marginLeft: "8px" }}
          >
            Most Active Sectors
          </Typography>

          {loading ? (
            <Typography sx={{ color: "#fff", textAlign: "center" }}>
              Loading...
            </Typography>
          ) : error ? (
            <Typography sx={{ color: "#ff5252", textAlign: "center" }}>
              {error} <br />
              <span
                onClick={() => dispatch(fetchActiveSectors())}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#39D353",
                }}
              >
                Retry
              </span>
            </Typography>
          ) : sectors.length > 0 ? (
            <Box sx={{ marginTop: "8px" }}>
              {sectors.slice(0, 3).map((sector, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: "#fff",
                    background: "#333",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    marginBottom: "4px",
                  }}
                >
                  {sector.date},
                  {sector.sector}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: "#fff", textAlign: "center" }}>
              No active sectors available.
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{
              color: "#39D353",
              textAlign: "right",
              cursor: "pointer",
              fontSize: "12px",
              marginTop: "auto",
            }}
            onClick={handleViewAll}
          >
            View All
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📌
        </Typography>
      )}

      {/* View All Sliding Modal */}
      <Modal open={viewAll} onClose={() => setViewAll(false)}>
        <Slide direction="left" in={viewAll} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "absolute",
              left: "20%",
              transform: "translate(0, 0)", 
              width: 1355,
              background: "#272D35",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: 24,
              maxHeight: "100vh",
              overflowY: "auto",
              transition: "0.5s ease-in-out",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff",  }}>
              All Active Sectors
            </Typography>

            {loading ? (
              <Typography sx={{ color: "#fff",  }}>
                Loading...
              </Typography>
            ) : error ? (
              <Typography sx={{ color: "#ff5252", }}>
                {error}
              </Typography>
            ) : (
              <Box sx={{ marginTop: "8px" }}>
                {sectors.map((sector, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "#fff",
                      background: "#333",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    {sector.date},
                    {sector.sector}
                  </Typography>
                ))}
              </Box>
            )}

            <Typography
              variant="body2"
              sx={{
                color: "#ff5252",
                textAlign: "right",
                cursor: "pointer",
                fontSize: "12px",
                marginTop: "12px",
              }}
              onClick={() => setViewAll(false)}
            >
              Close
            </Typography>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

const VideoSection = ({ open }) => {
  return (
    <Box
      sx={{
        padding: open ? "16px" : "8px",
        transition: "0.3s",
        marginTop: "-62px",
      }}
    >
      {open ? (
        <Box
          sx={{
            background: "#272D35",
            borderRadius: "8px",
            padding: "4px",
            height: "172px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              marginBottom: "8px",
              fontSize: "12px",
              marginLeft: "8px",
            }}
          >
            Text In One Line About Video
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "120px",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <iframe
              width="100%"
              height="124px"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Market Analysis"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            marginTop: "-150px",
            cursor: "pointer",
          }}
        >
          📹
        </Typography>
      )}
    </Box>
  );
};

const NewsPanel = ({ open, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: open ? "0" : "-80%",
        width: "80%",
        height: "100vh",
        background: "#111",
        transition: "right 0.3s ease-in-out",
        padding: "16px",
        zIndex: 1200,
      }}
    >
      <IconButton onClick={onClose} sx={{ color: "#fff" }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "16px" }}>
        Top News
      </Typography>
      <Box
        sx={{
          height: "calc(100% - 40px)",
          overflowY: "auto",
          background: "#222",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {/* News content */}
      </Box>
    </Box>
  );
};

export default function RightSidebar({ open, toggleSidebar }) {
  const [showNewsPanel, setShowNewsPanel] = useState(false);

  const handleViewAll = () => {
    setShowNewsPanel(true);
    toggleSidebar(false);
  };

  const handleCloseNewsPanel = () => {
    setShowNewsPanel(false);
    toggleSidebar(true);
  };

  return (
    <>
      {!showNewsPanel && (
        <Drawer variant="permanent" anchor="right" open={open}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              padding: "10px",
              marginTop: "-10px",
            }}
          >
            <IconButton onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          </Box>
          <AdvDecSection open={open} />
          <TopNewsSection open={open} onViewAll={handleViewAll} />
          <AnotherSection open={open} onViewAll={handleViewAll} />
          <VideoSection open={open} />
        </Drawer>
      )}
      <NewsPanel open={showNewsPanel} onClose={handleCloseNewsPanel} />
    </>
  );
}
